import config from './index';

describe('Config', () => {
  it('should load development config by default', () => {
    const expectedConfig = {
      env: 'test',
      api: {
        prefix: '/api',
      },
      port: 8000,
      database: {
        user: 'test',
        host: 'localhost',
        database: 'test',
        password: 'T3$T',
        port: 5454,
      },
      jwt: 'TEST_JWT_SECRET',
      logs: {
        level: 'silly',
      },
    };

    expect(config).toEqual(expectedConfig);
  });
});
