import express from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import Logger from '@/loaders/logger';
import { userFromUsernameQuery } from '@/queries/user';
import { authenticateJWT } from '@/services/auth';
import { User } from '@shared/types/user';

jest.mock('passport', () => ({
  initialize: jest.fn(() => (_req, _res, next) => next()),
  authenticate: jest.fn((_strategy, _options) => (_req, _res, next) => next()),
  session: jest.fn(() => (_req, _res, next) => next()),
  use: jest.fn(),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
}));
jest.mock('passport-jwt');
jest.mock('passport-local');
jest.mock('@/loaders/logger');
jest.mock('@/queries/user');
jest.mock('@/services/auth');
jest.mock('@/config', () => ({
  jwt: {
    secret: 'test-secret',
  },
  logs: {
    level: 'silly',
  },
  node_env: () => 'test',
}));

describe('Passport Loader', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
  });

  it('should initialize passport', () => {
    require('./passport').default(app);
    expect(passport.initialize).toHaveBeenCalled();
    expect(passport.session).toHaveBeenCalled();
  });

  it('should use LocalStrategy and JwtStrategy', () => {
    require('./passport').default(app);
    expect(passport.use).toHaveBeenCalledWith(expect.any(LocalStrategy));
    expect(passport.use).toHaveBeenCalledWith(expect.any(passportJWT.Strategy));
  });

  it('should serialize user', () => {
    const mockUser: User = { id: 1, username: 'testuser' } as User;
    const done = jest.fn();
    require('./passport').default(app);
    const serializeUser = (passport.serializeUser as jest.Mock).mock
      .calls[0][0];
    serializeUser(mockUser, done);
    expect(Logger.info).toHaveBeenCalledWith(
      `Serializing user: ${mockUser.username}`
    );
    expect(done).toHaveBeenCalledWith(null, mockUser);
  });

  it('should deserialize user', async () => {
    const mockUser: User = { id: 1, username: 'testuser' } as User;
    const done = jest.fn();
    (userFromUsernameQuery as jest.Mock).mockResolvedValue(mockUser);
    require('./passport').default(app);
    const deserializeUser = (passport.deserializeUser as jest.Mock).mock
      .calls[0][0];
    await deserializeUser(mockUser, done);
    expect(Logger.info).toHaveBeenCalledWith(
      `Serializing user: ${mockUser.username}`
    );
    expect(userFromUsernameQuery).toHaveBeenCalledWith(mockUser.username);
    expect(done).toHaveBeenCalledWith(null, mockUser);
  });

  it('should authenticate JWT strategy', async () => {
    const mockUser: User = { id: 1, username: 'testuser' } as User;
    (authenticateJWT as jest.Mock).mockResolvedValue(mockUser);
    const JwtStrategy = (passportJWT.Strategy as jest.Mock).mock.calls[0][1];
    const done = jest.fn();
    await JwtStrategy({ id: 1 }, done);
    expect(Logger.info).toHaveBeenCalledWith('Payload received', { id: 1 });
    expect(authenticateJWT).toHaveBeenCalledWith(1);
    expect(done).toHaveBeenCalledWith(null, mockUser);
  });

  it('should fail JWT strategy with invalid token', async () => {
    (authenticateJWT as jest.Mock).mockResolvedValue(null);
    const JwtStrategy = (passportJWT.Strategy as jest.Mock).mock.calls[0][1];
    const done = jest.fn();
    await JwtStrategy({ id: 1 }, done);
    expect(Logger.info).toHaveBeenCalledWith('Payload received', { id: 1 });
    expect(authenticateJWT).toHaveBeenCalledWith(1);
    expect(done).toHaveBeenCalledWith(null, false);
  });
});
