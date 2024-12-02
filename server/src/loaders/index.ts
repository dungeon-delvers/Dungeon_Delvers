import { Server } from 'socket.io';
import socketLoader from './socket';

export default async (app: Server) => {
  socketLoader(app);
};
