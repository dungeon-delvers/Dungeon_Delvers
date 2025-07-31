import { Engine } from '@babylonjs/core';
import { Socket } from 'socket.io-client';

import { renderZoneFile } from '../../engine/graphics/zone';

export default (socket: Socket, engine: Engine) => {
  socket.on("zone:loaded", async (zoneData) => {
      renderZoneFile(zoneData['file_name'], engine)
  });
}