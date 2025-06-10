import { getCharacterByID } from '@/queries/playerCharacter';
import { Server } from 'socket.io';

export default (io: Server) => {
  io.on('actor:load', async (socket, actorId: number) => {
    const result = await getCharacterByID(actorId);
    socket.emit('actor:loaded', {
      ...result,
    });
  });
};
