import { Router, Request, Response } from 'express';
import middlewares from '@/api/middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/characters', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};
