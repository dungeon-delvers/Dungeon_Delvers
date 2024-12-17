import { Router } from 'express';

import auth from './routes/auth';
import characters from './routes/characters';

export default () => {
  const router = Router();
  auth(router);
  characters(router);
  return router;
};
