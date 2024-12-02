import { Server } from 'socket.io';
import { isAuthSocket } from '@/api/middlewares/isAuth';
import events from '@/api';
import Logger from './logger';

export default (io: Server) => {
  Logger.info('✌️ Socket.IO is loading');
  events(io);
  io.use((socket, next) => {
    isAuthSocket(socket, next);
    next();
  });
  Logger.info('✌️ Socket.IO loaded');
};
