import { Server } from 'socket.io';

import login from './events/login';

export const events = (io: Server) => {
  login(io);
};
