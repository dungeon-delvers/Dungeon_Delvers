import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

import { isAuthSocket } from './isAuth';
import config from '@/config';

jest.mock('jsonwebtoken');

describe('isAuth middleware', () => {
  let socket: Partial<Socket>;
  let next: jest.Mock;

  beforeEach(() => {
    socket = {
      handshake: {
        address: '::1',
        auth: {},
        headers: {},
        issued: 1630000000000,
        query: {
          token: 'validtoken',
        },
        secure: false,
        time: new Date().toISOString(),
        url: '/socket.io/?token=validtoken&EIO=4&transport=polling&t=NC1Z5VU',
        xdomain: false,
      },
      data: {},
    };
    next = jest.fn();
  });

  it('should set user data on the socket if the token is valid', () => {
    const decodedToken = { id: 1, name: 'Test User' };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    isAuthSocket(socket as Socket, next);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', config.jwt.secret, {
      algorithms: [config.jwt.algorithm],
    });
    expect(socket.data.user).toEqual(decodedToken);
  });

  it('should call next with an error if the token is invalid', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    isAuthSocket(socket as Socket, next);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', config.jwt.secret, {
      algorithms: [config.jwt.algorithm],
    });
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe('Invalid token');
  });

  it('should call next with an error if there is no token', () => {
    const sampleSocket = {
      handshake: {
        query: {
          token: undefined,
        },
      },
    };

    isAuthSocket(sampleSocket as unknown as Socket, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe(
      "Cannot set properties of undefined (setting 'user')"
    );
  });
});
