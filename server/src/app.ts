import { Server } from 'socket.io';
import { createServer } from 'http';

import config from './config';

import Logger from './loaders/logger';

async function startServer() {
  const httpServer = createServer();
  const app = new Server(httpServer, {
    // options
  });
  const { default: loaders } = await import('./loaders');
  loaders(app);
  httpServer.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Game Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  });
}

startServer();
