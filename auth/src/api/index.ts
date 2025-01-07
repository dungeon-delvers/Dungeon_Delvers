import { Router } from 'express';

import auth from './routes/auth';
import characters from './routes/characters';
import health from './routes/health';

export default () => {
  const router = Router();
  health(router);
  auth(router);
  characters(router);
  return router;
};
