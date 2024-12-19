import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';

export default (io: Server) => {
  io.on('connection', () => {
    LoggerInstance.info('User connected');
  });
};
