import { Algorithm } from 'jsonwebtoken';

type NodeEnv = 'test' | 'development' | 'production';

export default {
  api: {
    prefix: '/api',
  },
  database: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
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
  port: parseInt(process.env.AUTH_PORT as string, 10),
};
