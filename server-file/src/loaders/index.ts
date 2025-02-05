import { Application } from 'express';

import expressLoader from './express';
import Logger from './logger';

export default async (app: Application) => {
  await expressLoader(app);
  Logger.info('✌️ Express loaded');
};
