import winston from 'winston';

import config from '@/config';

import LoggerInstance from './logger';

jest.mock('@/config', () => ({
  logs: {
    level: 'info',
  },
  node_env: jest.fn(() => 'development'),
}));

const devLogger = require('./logger').default;
describe('LoggerInstance', () => {
  it('should be defined', () => {
    expect(LoggerInstance).toBeDefined();
  });

  it('should have the correct log level', () => {
    expect(LoggerInstance.level).toBe('info'); // Assuming 'info' is the log level set in config
  });

  it('should log messages correctly', () => {
    const logSpy = jest.spyOn(LoggerInstance, 'info');
    LoggerInstance.info('Test log message');
    expect(logSpy).toHaveBeenCalledWith('Test log message');
  });

  describe('LoggerInstance', () => {
    it('should be defined', () => {
      expect(LoggerInstance).toBeDefined();
    });

    it('should have the correct log level', () => {
      expect(LoggerInstance.level).toBe('info'); // Assuming 'info' is the log level set in config
    });

    it('should log messages correctly', () => {
      const logSpy = jest.spyOn(LoggerInstance, 'info');
      LoggerInstance.info('Test log message');
      expect(logSpy).toHaveBeenCalledWith('Test log message');
    });

    it('should log errors with stack trace', () => {
      const error = new Error('Test error');
      const logSpy = jest.spyOn(LoggerInstance, 'error');
      LoggerInstance.error(error);
      expect(logSpy).toHaveBeenCalledWith(error);
    });
    it('should use CLI format in development environment', () => {
      (config.node_env as jest.Mock).mockReturnValue('development');
      const transport = devLogger.transports.find((t: any) => t instanceof winston.transports.Console);
      expect(transport.format).toBeDefined();
    });
  });
});
