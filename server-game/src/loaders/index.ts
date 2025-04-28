import { Server } from 'socket.io';

import LoggerInstance from './logger';
import socketLoader from './socket';

export default async (io: Server) => {
  LoggerInstance.info('Loading socket events');
  socketLoader(io);
};
