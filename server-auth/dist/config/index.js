"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
exports.default = {
    api: {
        prefix: '/api',
    },
    /**
     * Your favorite port
     */
    port: parseInt(process.env.AUTH_PORT, 10),
    database: {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT, 10),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        algorithm: process.env.JWT_ALGORITHM,
    },
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    errorMsg: {
        internalError: 'Internal server error',
    },
};
//# sourceMappingURL=index.js.map