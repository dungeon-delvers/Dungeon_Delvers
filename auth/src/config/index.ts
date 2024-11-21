import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: `${__dirname}/../../../.env` });
if (envFound.error) {
  // This error should crash whole process

  throw new Error(`⚠️  Couldn't find .env file ${__dirname}/../.env ⚠️`);
}

export default {
  api: {
    prefix: '/api',
  },
  /**
   * Your favorite port
   */
  port: parseInt(process.env.AUTH_SERVER_PORT as string, 10),

  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string, 10),
  },

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};
