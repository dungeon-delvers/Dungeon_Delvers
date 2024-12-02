import config from './config';

describe('Server', () => {
  let createServer: jest.Mock;
  let loaders: jest.Mock;
  let info: jest.Mock;
  let listen: jest.Mock;
  beforeEach(async () => {
    loaders = jest.fn();
    info = jest.fn();
    listen = jest.fn((_port, callback) => {
      callback();
    });
    createServer = jest.fn().mockReturnValue({ listen });
    jest.mock('http', () => ({
      createServer,
    }));
    jest.mock('./config', () => ({
      ...config,
      port: 4001,
    }));
    jest.mock('socket.io', () => ({
      Server: jest.fn(),
    }));
    jest.mock('./loaders', () => loaders);
    jest.mock('./loaders/logger', () => ({
      info,
    }));
    await import('./app');
  });
  it('should create server on port 8080', () => {
    expect(createServer).toHaveBeenCalled();
    expect(listen).toHaveBeenCalledWith(4001, expect.any(Function));
    expect(loaders).toHaveBeenCalled();
    expect(info).toHaveBeenCalledWith(expect.stringContaining('Game Server listening on port: 4001'));
  });
});
