import { Algorithm } from 'jsonwebtoken';

type NodeEnv = 'test' | 'development' | 'production';

export default {
  api: {
    prefix: '/api',
  },
  errorMsg: {
    internalError: 'Internal server error',
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    algorithm: process.env.JWT_ALGORITHM as Algorithm,
  },
  logs: {
    level: process.env.LOG_LEVEL,
  },
  node_env: (env: NodeEnv = process.env.NODE_ENV as NodeEnv) => env || 'development',
  port: parseInt(process.env.SERVER_FILE_PORT as string, 10),
};
