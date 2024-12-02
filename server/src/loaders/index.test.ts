import { Server } from 'socket.io';
import socketLoader from './socket';
import loaders from './index';
import Logger from './logger';

jest.mock('socket.io');
jest.mock('./socket');
jest.mock('./logger', () => ({
  info: jest.fn(),
}));

describe('indexLoader', () => {
  let mockApp: Server;
  beforeEach(async () => {
    jest.clearAllMocks();
    mockApp = {} as Server;
    process.env.NODE_ENV = 'development';

    await loaders(mockApp);
  });
  it('should load socket and log info in non-test environment', () => {
    expect(socketLoader).toHaveBeenCalledWith(mockApp);
    expect(Logger.info).toHaveBeenCalledWith('✌️ Socket.IO loaded');
  });
});
