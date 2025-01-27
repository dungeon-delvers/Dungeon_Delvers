import { Application } from 'express';

import expressLoader from './express';
import Logger from './logger';
import passportLoader from './passport';

export default async (app: Application) => {
  await expressLoader(app);
  await passportLoader(app);
  Logger.info('✌️ Express loaded');
};
