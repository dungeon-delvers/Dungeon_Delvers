import { Algorithm } from 'jsonwebtoken';

import config from '@/config';

describe('Config', () => {
  it('should have the correct API prefix', () => {
    expect(config.api.prefix).toBe('/api');
  });

  it('should parse the AUTH_PORT correctly', () => {
    process.env.AUTH_PORT = '8000';
    expect(config.port).toBe(8000);
  });

  it('should have the correct database configuration', () => {
    expect(config.database).toEqual({
      user: 'test_user',
      host: 'test-host',
      database: 'test-db',
      password: 'test-password',
      port: 5454,
    });
  });

  it('should have the correct JWT configuration', () => {
    process.env.JWT_SECRET = 'secret';
    process.env.JWT_ALGORITHM = 'HS256';
    expect(config.jwt).toEqual({
      secret: 'TEST_JWT_SECRET',
      algorithm: 'HS256' as Algorithm,
    });
  });

  it('should have the correct default log level', () => {
    expect(config.logs.level).toBe('info');
  });

  it('should have the correct error message', () => {
    expect(config.errorMsg.internalError).toBe('Internal server error');
  });
  it('should default node_env to test', () => {
    expect(config.node_env()).toBe('test');
  });

  it('should set node_env to if passed', () => {
    expect(config.node_env('development')).toBe('development');
  });
});
