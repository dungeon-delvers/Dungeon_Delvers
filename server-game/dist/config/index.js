"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
exports.default = {
    env: process.env.NODE_ENV,
    api: {
        prefix: '/api',
    },
    /**
     * Your favorite port
     */
    port: parseInt(process.env.SERVER_PORT, 10),
    client: {
        url: process.env.CLIENT_HOST,
        port: parseInt(process.env.CLIENT_PORT, 10),
    },
    database: {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT, 10),
    },
    jwt: {
        algorithm: process.env.JWT_ALGORITHM,
        secret: process.env.JWT_SECRET,
    },
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
};
//# sourceMappingURL=index.js.map