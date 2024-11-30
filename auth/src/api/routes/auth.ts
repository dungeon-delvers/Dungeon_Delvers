import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {
  createUser,
  generatePasswordHash,
  loginUser,
  logoutUser,
  userFromEmail,
  userFromUsername,
} from '../../models/user';
import { validateUser } from '../../models/validation';
import config from '../../config';

export default (router: Router) => {
  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginUser(req.body.username, req.body.password);
    if (result) {
      delete result.password_hash;
      req.login(result, { session: false }, async err => {
        if (err) {
          next(err);
        } else {
          try {
            passport.authenticate('LocalStrategy')(req, res, function () {
              const token = config.jwt && jwt.sign(result, config.jwt);
              res.status(200).json({ token, result });
            });
          } catch (error: unknown) {
            if (error instanceof Error) {
              res.status(400).json({
                message: error.message,
              });
            } else {
              throw new Error(
                'Encountered unexpected error when trying to return error, might not have been an Error thrown.',
              );
            }
          }
        }
      });
    } else {
      res.status(400).json({ message: 'Incorrect username or password.' });
    }
  });
  router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    const result = await logoutUser(req.body.id);
    req.logOut({ keepSessionInfo: false }, async err => {
      if (err) {
        next(err);
      } else {
        try {
          res.status(200).json(result);
        } catch (error: unknown) {
          if (error instanceof Error) {
            res.status(400).json({
              message: error.message,
            });
          } else {
            throw new Error(
              'Encountered unexpected error when trying to return error, might not have been an Error thrown.',
            );
          }
        }
      }
    });
  });
  router.post('/signup', async (req: Request, res: Response) => {
    const validateUserResponse = validateUser(req.body);
    const { error } = validateUserResponse;
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { email, username, password } = req.body;
      const emailExists = await userFromEmail(email);
      if (emailExists) {
        res.status(409).json({ message: 'Email already exists' });
      }
      const usernameExists = await userFromUsername(username);
      if (usernameExists) {
        res.status(409).json({ message: 'Username already exists' });
      }
      const passwordHash = await generatePasswordHash(password);
      const createUserResult = await createUser(email, passwordHash, username);
      if (createUserResult) {
        res.status(201).json({ message: 'User created' });
      } else {
        res.status(400).json({ message: 'User not created' });
      }
    }
  });
};
