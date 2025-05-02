import jwt from 'jsonwebtoken';
import { ExtendedError, Socket } from 'socket.io';

import config from '@/config';

export const isAuthSocket = (
  socket: Socket,
  next: (error?: ExtendedError) => void
) => {
  // since you are sending the token with the query
  const token = socket.handshake.query?.token;
  try {
    const decoded =
      typeof token === 'string' &&
      jwt.verify(token, config.jwt.secret, {
        algorithms: [config.jwt.algorithm],
      });
    socket.data.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error('Invalid token'));
    }
  }
  return;
};
