// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const testConfig = {
  port: 8000,
  database: {
    user: 'test',
    host: 'localhost',
    database: 'test',
    password: 'T3$T',
    port: 5454,
  },
};
const deaultConfig = {
  api: {
    prefix: '/api',
  },
  /**
   * Your favorite port
   */
  port: parseInt(process.env.AUTH_PORT as string, 10),

  database: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
  },

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};

export default process.env.NODE_ENV === 'test' ? { ...deaultConfig, ...testConfig } : deaultConfig;
