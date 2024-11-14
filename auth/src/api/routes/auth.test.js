"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
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
const userModel = {
    createUser: jest.fn(),
    generatePasswordHash: jest.fn(),
    userFromUsername: jest.fn(),
};
const validateUser = jest.fn();
describe('Auth Routes', () => {
    let pool;
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        const { default: loaders } = yield Promise.resolve().then(() => __importStar(require('../../loaders')));
        loaders(app);
        const router = express_1.default.Router();
        (0, auth_1.default)(router);
        app.use(router);
    }));
    beforeEach(() => {
        pool = new pg_1.Pool();
        jest.mock('../../models/user', () => ({
            userModel,
        }));
        jest.mock('../../models/validation', () => ({
            validateUser: jest.fn(),
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /login', () => {
        it('should authenticate user and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            pool.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        username: 'testuser',
                        passwordHash: 'passwordHash',
                        email: 'testuser@example.com',
                    },
                ],
            });
            userModel.userFromUsername.mockResolvedValue({
                id: 1,
                username: 'testuser',
            });
            const response = yield (0, supertest_1.default)(app)
                .post('/login')
                .send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual({
                id: 1,
                username: 'testuser',
                email: 'testuser@example.com',
            });
        }));
    });
    describe('POST /signup', () => {
        it('should create a new user and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            pool.query.mockResolvedValueOnce({
                command: 'INSERT',
                rowCount: 1,
                oid: 0,
                rows: [],
                fields: [],
            });
            validateUser.mockReturnValue({ error: null });
            userModel.generatePasswordHash.mockResolvedValue('hashedpassword');
            userModel.createUser.mockResolvedValue(true);
            const response = yield (0, supertest_1.default)(app).post('/signup').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password',
                passwordRepeat: 'password',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created');
        }));
        it('should return 400 status for invalid user data', () => __awaiter(void 0, void 0, void 0, function* () {
            validateUser.mockReturnValue({ error: { message: 'Invalid data' } });
            const response = yield (0, supertest_1.default)(app)
                .post('/signup')
                .send({ email: 'invalidemail', username: '', password: 'password' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('"email" must be a valid email');
        }));
        it('should return 400 status if user creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            validateUser.mockReturnValue({ error: null });
            userModel.generatePasswordHash.mockResolvedValue('hashedpassword');
            userModel.createUser.mockResolvedValue(false);
            const response = yield (0, supertest_1.default)(app).post('/signup').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password',
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('"passwordRepeat" is required');
        }));
    });
});
