import { User } from '@dungeon-delvers/types';
import { Joi, celebrate } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

import Logger from '@/loaders/logger';
import { generateToken, logout, signup } from '@/services/auth';

export default (router: Router) => {
  router.post(
    '/login',
    celebrate({ body: { username: Joi.string(), password: Joi.string() } }),
    async (req: Request, res: Response, next) => {
      passport.authenticate('local', { session: false }, (error: Error | null, user: User) => {
        if (error) {
          Logger.error(error);
          next(error);
          return;
        }
        if (!user) {
          res.status(401).json({ error: 'Invalid username or password' });
          return;
        }
        req.login(user, { session: false }, async loginError => {
          if (loginError) {
            console.log({ loginError });
            Logger.error(loginError);
            next(loginError);
            return;
          }
          const token = await generateToken(user);
          res.status(200).json({ token });
        });
      })(req, res);
    },
  );
  router.post(
    '/logout',
    celebrate({ body: { id: Joi.number().required() } }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await logout(req.body.id);
        res.status(200).json({ message: 'User logged out' });
      } catch (error: unknown) {
        Logger.error(error);
        next(error);
      }
    },
  );

  router.post(
    '/signup',
    celebrate({
      body: {
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        passwordRepeat: Joi.string().required().valid(Joi.ref('password')),
      },
    }),
    async (req: Request, res: Response, next) => {
      try {
        const { token } = await signup(req.body.email, req.body.username, req.body.password);
        if (!token) {
          res.status(500).json({ error: 'User not created' });
          return;
        }
        res.status(200).json({ token });
      } catch (error: unknown) {
        if (error instanceof Error) {
          next(error);
        } else {
          next(
            new Error('Encountered unexpected error when trying to return error, might not have been an Error thrown.'),
          );
        }
      }
    },
  );
};
