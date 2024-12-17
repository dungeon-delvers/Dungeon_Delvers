import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';

import config from '@/config';
import Logger from '@/loaders/logger';

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: `${config.client.url}:${config.client.port}`,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  const { default: loaders } = await import('./loaders');
  loaders(io);
  httpServer.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Game Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  });
}

startServer();
