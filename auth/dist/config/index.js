"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config({ path: `${__dirname}/../../../.env` });
if (envFound.error) {
    // This error should crash whole process
    throw new Error(`⚠️  Couldn't find .env file ${__dirname}/../.env ⚠️`);
}
exports.default = {
    api: {
        prefix: '/api',
    },
    /**
     * Your favorite port
     */
    port: parseInt(process.env.AUTH_SERVER_PORT, 10),
    database: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
    },
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
};
