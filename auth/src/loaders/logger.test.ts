import winston from 'winston'
import config from '../config'
import LoggerInstance from './logger'

jest.mock('winston', () => {
  const mWinston = {
    createLogger: jest.fn(() => {
      return {
        info: jest.fn(),
      }
    }),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      errors: jest.fn(),
      splat: jest.fn(),
      json: jest.fn(),
      cli: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
    },
    config: {
      npm: {
        levels: jest.fn(),
      },
    },
  }
  return mWinston
})

jest.mock('../config', () => ({
  logs: {
    level: 'info',
  },
}))

describe('Logger Loader', () => {
  it('should create a logger with correct configuration', () => {
    const transports = []
    if (process.env.NODE_ENV !== 'development') {
      transports.push(new winston.transports.Console())
    } else {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
          ),
        }),
      )
    }

    const expectedConfig = {
      level: config.logs.level,
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports,
    }
    LoggerInstance.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `)
    expect(winston.createLogger).toHaveBeenCalledWith(expectedConfig)
  })
})
