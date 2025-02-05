import config from './index';

describe('Config', () => {
  it('should load development config by default', () => {
    const expectedConfig = {
      env: 'test',
      api: {
        prefix: '/api',
      },
      client: {
        url: 'http://localhost',
        port: 3000,
      },
      port: 8080,
      database: {
        user: 'test_user',
        host: 'test-host',
        database: 'test-db',
        password: 'test-password',
        port: 5454,
      },
      jwt: {
        algorithm: 'HS256',
        secret: 'TEST_JWT_SECRET',
      },
      logs: {
        level: 'silly',
      },
    };

    expect(config).toEqual(expectedConfig);
  });
});
