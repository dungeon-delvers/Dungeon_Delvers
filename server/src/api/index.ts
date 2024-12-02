import { Server } from 'socket.io';
import login from './events/login';
export default (io: Server) => {
  login(io);
};
