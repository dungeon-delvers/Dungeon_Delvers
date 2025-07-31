import { Server } from 'socket.io';

import { events } from '@/events';
import { isAuthSocket } from '@/events/middlewares/isAuth';

import Logger from './logger';

export default (io: Server) => {
  Logger.info('✌️ Socket.IO is loading');
  io.use((socket, next) => {
    isAuthSocket(socket, next);
  });
  events(io);
  Logger.info('✌️ Socket.IO loaded');
};
