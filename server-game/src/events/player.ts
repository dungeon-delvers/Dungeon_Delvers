import { Socket } from 'socket.io';

import { getPlayerById } from '@/engine/player/playerCharacter';

export const playerEvents = (socket: Socket) => {
  socket.on('player:load', async (playerId: number) => {
    const result = await getPlayerById(playerId);
    console.log('player:load', result);
    socket.emit('player:loaded', {
      ...result,
    });
  });
};
