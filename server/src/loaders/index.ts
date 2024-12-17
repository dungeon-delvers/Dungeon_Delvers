import { Server } from 'socket.io';

import socketLoader from './socket';

export default async (io: Server) => {
  socketLoader(io);
};
