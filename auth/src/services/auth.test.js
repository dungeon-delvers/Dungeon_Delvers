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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./auth"));
const pg_1 = require("pg");
jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});
describe('Auth Service', () => {
    let app;
    let pool;
    beforeEach(() => {
        app = (0, express_1.default)();
        (0, auth_1.default)(app);
        pool = new pg_1.Pool();
    });
    it('should initialize session and passport', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.status).toBe(404); // Assuming no route is defined, it should return 404
    }));
    it('should serialize user', () => {
        const user = { id: 1, email: 'test@example.com', password: 'password' };
        passport_1.default.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport_1.default.serializeUser(user, (err, id) => {
            expect(err).toBeNull();
            expect(id).toBe(user.id);
        });
    });
    it('should deserialize user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: 1, email: 'test@example.com', password: 'password' };
        pool.query.mockResolvedValueOnce({ rows: [user] });
        passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
            const query = {
                text: 'SELECT * FROM users WHERE id = $1',
                value: [id],
            };
            const { rows } = yield pool.query(query);
            if (rows.length === 0) {
                return done(new Error('User not found'));
            }
            done(null, rows[0]);
        }));
        passport_1.default.deserializeUser(user.id, (err, user) => {
            expect(err).toBeNull();
            expect(user).toEqual(user);
        });
    }));
    it('should return error if user not found during deserialization', () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        pool.query.mockResolvedValueOnce({ rows: [] });
        passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
            const query = {
                text: 'SELECT * FROM users WHERE id = $1',
                value: [id],
            };
            const { rows } = yield pool.query(query);
            if (rows.length === 0) {
                return done(new Error('User not found'));
            }
            done(null, rows[0]);
        }));
        passport_1.default.deserializeUser(999, (err, user) => {
            expect(err).toEqual(new Error('User not found'));
            expect(user).toBeUndefined();
        });
    }));
});
