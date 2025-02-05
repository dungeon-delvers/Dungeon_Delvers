import { Server } from 'socket.io';

import { events } from '@/api';
import { isAuthSocket } from '@/api/middlewares/isAuth';

import Logger from './logger';

export default (io: Server) => {
  console.log(isAuthSocket);
  Logger.info('✌️ Socket.IO is loading');
  events(io);
  io.use((socket, next) => {
    isAuthSocket(socket, next);
    next();
  });
  Logger.info('✌️ Socket.IO loaded');
};
