"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const { DB_USER, DB_HOST = 'localhost', DB_PASSWORD, DB_NAME, DB_PORT, } = process.env;
exports.pool = new pg_1.Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
});
