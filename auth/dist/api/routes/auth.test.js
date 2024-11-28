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
const bcrypt_1 = __importDefault(require("bcrypt"));
const postgres_1 = require("../../services/database/postgres");
const auth_1 = __importDefault(require("./auth"));
jest.mock('../../services/database/postgres', () => ({
    pool: {
        query: jest.fn(),
    },
}));
const userModel = {
    createUser: jest.fn(),
    generatePasswordHash: jest.fn(),
    userFromUsername: jest.fn(),
    userFromEmail: jest.fn(),
    loginUser: jest.fn(),
    verifyPassword: jest.fn(),
};
const validateUser = jest.fn();
describe('Auth Routes', () => {
    let app;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        const { default: loaders } = yield Promise.resolve().then(() => __importStar(require('../../loaders')));
        loaders(app);
        const router = express_1.default.Router();
        (0, auth_1.default)(router);
        app.use(router);
        jest.mock('../../models/user', () => ({
            userModel,
        }));
        jest.mock('../../models/validation', () => ({
            validateUser: jest.fn(),
        }));
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /login', () => {
        it('should authenticate user and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            postgres_1.pool.query.mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        username: 'loginuser',
                        password_hash: yield bcrypt_1.default.hash('password', 10),
                        email: 'loginuser@example.com',
                    },
                ],
            });
            const response = yield (0, supertest_1.default)(app).post('/login').send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body.id).toStrictEqual(1);
            expect(response.body.username).toStrictEqual('loginuser');
            expect(response.body.email).toStrictEqual('loginuser@example.com');
        }));
    });
    describe('POST /signup', () => {
        it('should create a new user and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            postgres_1.pool.query.mockResolvedValueOnce({
                command: 'INSERT',
                rowCount: 1,
                oid: 0,
                rows: [],
                fields: [],
            });
            postgres_1.pool.query.mockResolvedValue({ rows: [] });
            postgres_1.pool.query.mockResolvedValue({ rows: [] });
            const response = yield (0, supertest_1.default)(app).post('/signup').send({
                email: 'registeruserpasses@example.com',
                username: 'registeruserpasses',
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
                .send({ email: 'registeruserfails', username: '', password: 'password' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('"email" must be a valid email');
        }));
        it('should return 400 status if user creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            validateUser.mockReturnValue({ error: null });
            userModel.generatePasswordHash.mockResolvedValue('hashedpassword');
            userModel.createUser.mockResolvedValue(false);
            const response = yield (0, supertest_1.default)(app).post('/signup').send({
                email: 'resigeruserfails@example.com',
                username: 'registeruserfails',
                password: 'password',
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('"passwordRepeat" is required');
        }));
    });
});
//# sourceMappingURL=auth.test.js.map