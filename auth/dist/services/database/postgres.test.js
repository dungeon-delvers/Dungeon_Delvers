"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("../../config");
const postgres_1 = require("./postgres");
jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(() => {
            return {
                query: jest.fn(),
                release: jest.fn(),
            };
        }),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});
describe('Postgres Pool', () => {
    it('should create a new pool with the correct configuration', () => {
        const { DB_USER, DB_HOST = 'localhost', DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
        expect(pg_1.Pool).toHaveBeenCalledWith({
            user: DB_USER,
            host: DB_HOST,
            database: DB_NAME,
            password: DB_PASSWORD,
            port: Number(DB_PORT),
        });
    });
    it('should connect to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield postgres_1.pool.connect();
        expect(client).toBeDefined();
    }));
    it('should execute a query', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = 'SELECT NOW()';
        const result = { rows: [{ now: new Date() }] };
        postgres_1.pool.query.mockResolvedValueOnce(result);
        const res = yield postgres_1.pool.query(query);
        expect(res).toEqual(result);
        expect(postgres_1.pool.query).toHaveBeenCalledWith(query);
    }));
    it('should close the pool', () => __awaiter(void 0, void 0, void 0, function* () {
        yield postgres_1.pool.end();
        expect(postgres_1.pool.end).toHaveBeenCalled();
    }));
});
