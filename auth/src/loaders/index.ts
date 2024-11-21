import { Application } from 'express';
import Logger from './logger';
import expressLoader from './express';

export default async (app: Application) => {
  await expressLoader(app);
  Logger.info('✌️ Express loaded');
};
