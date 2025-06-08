import { Application } from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import Logger from '@/loaders/logger';
import { userFromUsernameQuery } from '@/queries/user';
import { authenticateJWT, login } from '@/services/auth';
import config from '@/config';
import { User } from '@shared/types/user';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
  },
  async (jwt_payload, next) => {
    Logger.info('Payload received', jwt_payload);
    const user = await authenticateJWT(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  }
);

export default (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(login));
  passport.use(strategy);
  passport.serializeUser((user, done) => {
    Logger.info(`Serializing user: ${user.username}`);

    done(null, user);
  });
  passport.deserializeUser(async (inUser: User, done) => {
    Logger.info(`Serializing user: ${inUser.username}`);
    const user = await userFromUsernameQuery(inUser.username);
    done(null, user);
  });
  app.use(passport.authenticate('session'));
};
