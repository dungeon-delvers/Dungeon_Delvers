import { Server } from 'socket.io';
import LoggerInstance from '@/loaders/logger';

import { playerEvents } from './events/player';

export const events = (io: Server) => {
  io.on('connection', async (socket) => {
    LoggerInstance.info('User connected');
    socket.emit('connection:success', 'Connected to server');
    playerEvents(socket);
    socket.on('disconnect', () => {
      LoggerInstance.info('User disconnected');
    });
  });
};
