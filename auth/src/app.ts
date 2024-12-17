import express from 'express';

import config from '@/config';
import Logger from '@/loaders/logger';

async function startServer() {
  const app = express();
  const { default: loaders } = await import('@/loaders');
  loaders(app);
  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Auth Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  });
}

startServer();
