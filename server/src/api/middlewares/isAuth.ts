import { ExtendedError, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import config from '@/config';

export const isAuthSocket = (socket: Socket, next: (err?: ExtendedError) => void) => {
  // since you are sending the token with the query
  const token = socket.handshake.query?.token;
  try {
    const decoded = typeof token === 'string' && jwt.verify(token, config.jwt);
    socket.data.user = decoded;
  } catch (err) {
    return next(new Error('NOT AUTHORIZED'));
  }
  next();
};

const getTokenFromHeader = req => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  algorithms: [config.jwtAlgorithm], // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
});

export default isAuth;
