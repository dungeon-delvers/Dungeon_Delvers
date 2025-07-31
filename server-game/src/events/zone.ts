import { Server, Socket } from 'socket.io';

import LoggerInstance from '@/loaders/logger';
import { loadZoneById, Zone } from '@/engine/zone/zone';
import { Engine } from '@babylonjs/core';

export default (io: Server, socket: Socket) => {
  socket.on('zone:load', async (zoneId: number) => {
    LoggerInstance.info(zoneId)
    const zone = await loadZoneById(zoneId)
    LoggerInstance.info(zone);
    io.emit('zone:loaded', zone)
  });
};
