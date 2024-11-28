"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const { DB_USER, DB_HOST = 'localhost', DB_PASSWORD, DB_DATABASE_NAME, DB_PORT } = process.env;
exports.client = new pg_1.Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
});
//# sourceMappingURL=database.js.map