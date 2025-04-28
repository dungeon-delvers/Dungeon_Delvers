import { Vector3 } from '@babylonjs/core';
import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';

export default (io: Server) => {
  io.on('move', (_zone_id: number, _loc: Vector3) => {
    LoggerInstance.info('User connected');
  });
};
