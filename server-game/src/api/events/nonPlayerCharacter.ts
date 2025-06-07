export default (io: Server) => {
  io.on('actor:load', async (socket, actorId: number) => {
    const result = await getActorById(actorId);
    console.log('actor:load', result);
    socket.emit('actor:loaded', {
      ...result.stats,
    });
  });
};
