import { Request, Response, Router } from 'express';
import passport from 'passport';

import { getRaces } from '@/services/races';

export default (app: Router) => {
  app.get('/races', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    if (req.user) {
      res.status(200).json({ races: await getRaces() });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });
};
