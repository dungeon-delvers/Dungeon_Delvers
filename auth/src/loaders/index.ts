import { Application } from 'express';
import Logger from './logger';
import expressLoader from './express';

export default async (app: Application) => {
  await expressLoader(app);
  process.env.NODE_ENV !== 'test' && Logger.info('✌️ Express loaded');
};
