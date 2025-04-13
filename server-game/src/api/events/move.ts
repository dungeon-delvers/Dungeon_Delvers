import { Vector3 } from '@babylonjs/core';
import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';

export default (io: Server) => {
  io.on('move', (zone_id: number, loc: Vector3) => {
    LoggerInstance.info('User connected');
  });
};
