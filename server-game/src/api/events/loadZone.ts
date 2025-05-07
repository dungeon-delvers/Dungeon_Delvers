import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';
import { Zone } from '@/engine/core/zone';

export default (io: Server) => {
  io.on('loadZone', async (socket, zone_id: number) => {
    LoggerInstance.info('SMARFY');
    LoggerInstance.info(`Loading zone: ${zone_id}`);
    const zone = new Zone(zone_id, 'rook_tower_06_25_2024');
    LoggerInstance.info(`Loading zone: ${zone_id} - ${zone.fileName}`);
    await zone.initialize();
    const serializedScene = JSON.stringify(await zone.serializeScene());
    io.to(socket.id).emit('zoneLoaded', serializedScene);
  });
};
