import { Server } from 'socket.io';
import Logger from './logger';
import socketLoader from './socket';

export default async (app: Server) => {
  await socketLoader(app);
  process.env.NODE_ENV !== 'test' && Logger.info('✌️ Socket.IO loaded');
};
