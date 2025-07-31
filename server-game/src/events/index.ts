import { Server } from 'socket.io';
import LoggerInstance from '@/loaders/logger';

import { playerEvents } from './player';
import npcEvents from './npc'
import zoneEvents from './zone'

export const events = (io: Server) => {
  io.on('connection', async (socket) => {
    LoggerInstance.info('User connected');
    socket.emit('connection:success', 'Connected to server');
    npcEvents(io, socket);
    zoneEvents(io, socket);
    socket.on('disconnect', () => {
      LoggerInstance.info('User disconnected');
    });
  });
};
