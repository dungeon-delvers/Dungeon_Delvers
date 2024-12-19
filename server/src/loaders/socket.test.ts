import { Server } from 'socket.io';
import socketLoader from './socket';

jest.mock('socket.io');
jest.mock('@/api/middlewares/isAuth', () => {
  return {
    isAuthSocket: jest.fn((_socket, next) => next()),
  };
});

describe('socketLoader', () => {
  let mockIo: Server;

  beforeEach(() => {
    mockIo = new Server();
  });

  it('should apply isAuthSocket middleware', () => {
    socketLoader(mockIo);

    expect(mockIo.use).toHaveBeenCalled();
  });

  it('should register events', () => {
    socketLoader(mockIo);

    expect(mockIo.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });
});
