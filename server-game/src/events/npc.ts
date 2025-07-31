import { loadNPCById } from '@/engine/nonPlayerCharacter/nonPlayerCharacter';
import LoggerInstance from '@/loaders/logger';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket) => {
  socket.on('npc:load', async (npcId: number) => {
      LoggerInstance.info('Loading an NPC!')
      const result = await loadNPCById(npcId);
      io.emit('npc:loaded', {
      ...result,
    });
  });
};
