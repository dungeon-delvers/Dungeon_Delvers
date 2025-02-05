import winston from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

import config from '@/config';

const transports: ConsoleTransportInstance[] = [];
if (config.node_env() !== 'development') {
  transports.push(new winston.transports.Console());
} else {
  console.log('In development');
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    }),
  );
}

const LoggerInstance = winston.createLogger({
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
});

export default LoggerInstance;
