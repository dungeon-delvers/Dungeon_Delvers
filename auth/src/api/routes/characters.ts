import { createCharacter, getCharacters } from '@/services/playerCharacter';
import { Request, Response, Router } from 'express';
import passport from 'passport';

export default (app: Router) => {
  app.get('/characters', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    if (req.user) {
      res.status(200).json({ characters: await getCharacters(req.user.id) });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

  app.post(
    '/character/create',
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
      if (req.user) {
        res.status(200).json({ character: await createCharacter(req.user.id, req.body) });
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    },
  );
};
