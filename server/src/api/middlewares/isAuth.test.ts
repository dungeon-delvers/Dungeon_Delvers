import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

import isAuth from './isAuth';

jest.mock('jsonwebtoken');
jest.mock('../../config', () => ({
  jwt: 'testsecret',
}));

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

    isAuth(socket as Socket, next);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', 'testsecret');
    expect(socket.data.user).toEqual(decodedToken);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with an error if the token is invalid', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    isAuth(socket as Socket, next);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', 'testsecret');
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe('NOT AUTHORIZED');
  });

  it('should call next with an error if there is no token', () => {
    const sampleSocket = {
      handshake: {
        query: {
          token: undefined,
        },
      },
    };

    isAuth(sampleSocket as unknown as Socket, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe('NOT AUTHORIZED');
  });
});
