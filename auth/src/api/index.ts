import { Router } from 'express';

import auth from './routes/auth';
import characters from './routes/characters';
import health from './routes/health';
import races from './routes/races';

export default () => {
  const router = Router();
  health(router);
  auth(router);
  characters(router);
  races(router);
  return router;
};
