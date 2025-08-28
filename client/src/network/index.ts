import { Engine } from '@babylonjs/core';
import { Socket } from 'socket.io-client';

import npcEvents from './handlers/npc';
import zoneEvents from './handlers/zone';

export default (socket: Socket, engine: Engine) => {
  socket.emit('zone:load', 2)
  npcEvents(socket);
  zoneEvents(socket, engine);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};