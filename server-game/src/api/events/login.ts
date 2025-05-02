import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';
import { Zone } from '@/services/zone';

export default (io: Server) => {
  io.on('connection', async (socket) => {
    LoggerInstance.info('User connected');
    const zone = new Zone();
    const positions = zone.positions;
    const vertexPosition = (targetIndex: number) => {
      const [x, y, z] = positions.slice(targetIndex * 3, targetIndex * 3 + 3);
      return { x, y, z };
    };
    const actors = {
      1: {
        id: 1,
        name: 'Player1',
        position: vertexPosition(50),
        rotation: { x: 0, y: 0, z: 0 },
      },
      2: {
        id: 2,
        name: 'Player2',
        position: vertexPosition(80),
        rotation: { x: 0, y: 0, z: 0 },
      },
    };
    const serializedScene = JSON.stringify(await zone.serializeScene());
    io.to(socket.id).emit('zoneLoaded', serializedScene);
    io.to(socket.id).emit('actorsLoaded', actors);
    socket.on('disconnect', () => {
      LoggerInstance.info('User disconnected');
    });
  });
};
