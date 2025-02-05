import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VerifyFunction } from 'passport-local';

import config from '@/config';
import Logger from '@/loaders/logger';
import { createUserQuery, getUserFromID, loginUserQuery, logoutUserQuery, userFromUsernameQuery } from '@/queries/user';

export const login: VerifyFunction = async (username: string, password: string, done) => {
  try {
    const user = await userFromUsernameQuery(username);
    if (!user) {
      Logger.info('User not found');
      done(null, false, { message: 'User not found' });
      return;
    }
    const verified = await verifyPassword(password, user.password_hash);
    if (verified) {
      await loginUserQuery(user.id);
      Logger.info('User verified');
      done(null, user);
      return;
    } else {
      Logger.info('Incorrect password');
      done(null, false, { message: 'Incorrect password' });
      return;
    }
  } catch (error) {
    Logger.error(error);
    done(error);
    return;
  }
};

export const logout = async (id: number) => {
  const user = await logoutUserQuery(id);
  if (!user) {
    throw new Error('User not found');
  }
};

export const signup = async (email: string, username: string, password: string) => {
  try {
    const passwordHash = await generatePasswordHash(password);
    const user = await createUserQuery(email, username, passwordHash);
    if (!user) {
      throw new Error('User not created');
    }
    const token = await generateToken(user);
    return { user, token };
  } catch (error) {
    Logger.error(error);
    throw error;
  }
};

export const authenticateJWT = async (id: number) => {
  const user = await getUserFromID(id);
  return user;
};

export const generateToken = async user => {
  return jwt.sign({ id: user.id }, config.jwt.secret, { algorithm: config.jwt.algorithm });
};

export const generatePasswordHash = async (plaintextPassword: string) => {
  const saltRounds = 10;
  return bcrypt.hash(plaintextPassword, saltRounds);
};

const verifyPassword = async (plaintextPassword: string, passwordHash: string) => {
  return await bcrypt.compare(plaintextPassword, passwordHash);
};
