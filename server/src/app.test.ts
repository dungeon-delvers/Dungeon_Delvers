import { createServer } from 'http';
import { Server } from 'socket.io';
import config from './config';
import Logger from './loaders/logger';
const client = require('socket.io-client')(`http://localhost:${config.port}`);

jest.mock('./loaders/logger', () => ({
  info: jest.fn(),
}));

jest.mock('./loaders', () =>
  jest.fn().mockImplementation(app => {
    // Mock implementation of loaders
  }),
);

describe('Server', () => {
  let httpServer;
  let app;

  beforeAll(async () => {
    httpServer = createServer();
    app = new Server(httpServer, {
      // options
    });
    const { default: loaders } = await import('./loaders');
    loaders(app);
    httpServer.listen(config.port);
  });

  afterAll(() => {
    httpServer.close();
  });

  it('should start the server and log the correct message', () => {
    expect(Logger.info).toHaveBeenCalledWith(
      expect.stringContaining(`🛡️  Game Server listening on port: ${config.port} 🛡️`),
    );
  });

  it('should respond to a connection', done => {
    client.on('connect', () => {
      client.close();
      done();
    });
  });
});
