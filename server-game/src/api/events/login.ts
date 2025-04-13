import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';
import { Zone } from '@/services/zone';

export default (io: Server) => {
  io.on('connection', async socket => {
    LoggerInstance.info('User connected');
    const zone = new Zone();
    const serializedScene = JSON.stringify(await zone.serializeScene());
    io.to(socket.id).emit('zoneLoaded', serializedScene);
  });
};
