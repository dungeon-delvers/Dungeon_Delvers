import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';
import { Zone } from '@/engine/core/zone';
import { getPlayerById } from '@/engine/core/player';

export default (io: Server) => {
  io.on('connection', async (socket) => {
    LoggerInstance.info('User connected');
    socket.emit('connection:success', 'Connected to server');
    socket.on('character:load', async (character_id: number) => {
      const result = await getPlayerById(character_id);
      console.log('result', result);
    });
    // io.to(socket.id).emit('zoneLoaded', serializedScene);
    socket.on('disconnect', () => {
      LoggerInstance.info('User disconnected');
    });
  });
};
