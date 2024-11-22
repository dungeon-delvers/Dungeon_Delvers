"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
jest.mock('winston', () => {
    const mWinston = {
        createLogger: jest.fn(() => {
            return {
                info: jest.fn(),
            };
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
    };
    return mWinston;
});
jest.mock('../config', () => ({
    logs: {
        level: 'info',
    },
}));
describe('Logger Loader', () => {
    it('should create a logger with correct configuration', () => {
        const transports = [];
        if (process.env.NODE_ENV !== 'development') {
            transports.push(new winston_1.default.transports.Console());
        }
        else {
            transports.push(new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat()),
            }));
        }
        const expectedConfig = {
            level: config_1.default.logs.level,
            levels: winston_1.default.config.npm.levels,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
            transports,
        };
        logger_1.default.info(`
      ################################################
      🛡️  Server listening on port: ${config_1.default.port} 🛡️
      ################################################
    `);
        expect(winston_1.default.createLogger).toHaveBeenCalledWith(expectedConfig);
    });
});
