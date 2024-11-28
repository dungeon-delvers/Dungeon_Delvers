import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { createUser, generatePasswordHash, loginUser, userFromEmail, userFromUsername } from '../../models/user';
import { validateUser } from '../../models/validation';

export default (router: Router) => {
  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginUser(req.body.username, req.body.password);
    if (result) {
      req.login({ ...result, username: req.body.username, password: req.body.password }, async err => {
        if (err) {
          next(err);
        } else {
          try {
            passport.authenticate('LocalStrategy')(req, res, function () {
              delete result.passwordHash;
              res.status(200).json(result);
            });
          } catch (error) {
            res.status(400).json({
              message: err.message,
            });
          }
        }
      });
    } else {
      res.status(400).json({ message: 'Incorrect username or password.' });
    }
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
