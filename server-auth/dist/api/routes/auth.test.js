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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const loaders_1 = __importDefault(require("../../loaders"));
const userQueries = __importStar(require("../../queries/user"));
const auth_1 = require("../../services/auth");
jest.mock('@/services/database/postgres', () => ({
    pool: {
        query: jest.fn(),
    },
}));
jest.mock('@/services/auth', () => (Object.assign(Object.assign({}, jest.requireActual('@/services/auth')), { generateToken: jest.fn(), signup: jest.fn() })));
jest.mock('@/queries/user', () => ({
    createUserQuery: jest.fn(),
    userFromUsernameQuery: jest.fn(),
    loginUserQuery: jest.fn(),
    logoutUserQuery: jest.fn(),
}));
describe('Auth Routes', () => {
    let app;
    beforeEach(() => {
        app = (0, express_1.default)();
        (0, loaders_1.default)(app);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /login', () => {
        it('should authenticate user', () => __awaiter(void 0, void 0, void 0, function* () {
            userQueries.userFromUsernameQuery.mockResolvedValueOnce({
                id: 1,
                email: 'testuser@example.com',
                password_hash: yield (0, auth_1.generatePasswordHash)('password'),
                username: 'testuser',
                role: 'USER',
                loggedin: true,
                currentCharacterId: null,
                createdAt: '2022-01-01',
                updatedAt: '2022-01-01',
            });
            auth_1.generateToken.mockResolvedValueOnce('token');
            const response = yield (0, supertest_1.default)(app).post('/api/login').send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ token: 'token' });
        }));
        it('should return validation error for invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
            userQueries.userFromUsernameQuery.mockResolvedValueOnce(null);
            const response = yield (0, supertest_1.default)(app).post('/api/login').send({ username: 'invalid-user', password: 'password' });
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'Invalid username or password' });
        }));
        it('should handle errors during login', () => __awaiter(void 0, void 0, void 0, function* () {
            userQueries.userFromUsernameQuery.mockRejectedValueOnce(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app).post('/api/login').send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(500);
        }));
    });
    describe('POST /logout', () => {
        it('should logout user', () => __awaiter(void 0, void 0, void 0, function* () {
            userQueries.logoutUserQuery.mockResolvedValueOnce({
                id: 1,
                email: 'testuser@example.com',
                password_hash: yield (0, auth_1.generatePasswordHash)('password'),
                username: 'testuser',
                role: 'USER',
                loggedin: false,
                currentCharacterId: null,
                createdAt: '2022-01-01',
                updatedAt: '2022-01-01',
            });
            const response = yield (0, supertest_1.default)(app).post('/api/logout').send({ id: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'User logged out' });
        }));
        it('should return validation error for invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/api/logout').send({ id: 'invalid-id' });
            expect(response.status).toBe(500);
        }));
        it('should handle errors during logout', () => __awaiter(void 0, void 0, void 0, function* () {
            userQueries.logoutUserQuery.mockRejectedValueOnce(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app).post('/api/logout').send({ id: 1 });
            expect(response.status).toBe(500);
        }));
    });
    describe('POST /signup', () => {
        it('should signup user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                id: 1,
                email: 'testuser@example.com',
                password_hash: yield (0, auth_1.generatePasswordHash)('password'),
                username: 'testuser',
                role: 'USER',
                loggedin: false,
                currentCharacterId: null,
                createdAt: '2022-01-01',
                updatedAt: '2022-01-01',
            };
            userQueries.createUserQuery.mockResolvedValueOnce(user);
            auth_1.signup.mockResolvedValueOnce({ user, token: 'token' });
            const response = yield (0, supertest_1.default)(app)
                .post('/api/signup')
                .send({ email: 'testuser@example.com', username: 'testuser', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ token: 'token' });
        }));
        it('should return validation error for invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/api/signup').send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(500);
        }));
        it('should handle errors during signup', () => __awaiter(void 0, void 0, void 0, function* () {
            userQueries.createUserQuery.mockRejectedValueOnce(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app).post('/api/signup').send({
                email: 'testuser@example.com',
                password: 'password',
                username: 'testuser',
            });
            expect(response.status).toBe(500);
        }));
    });
});
//# sourceMappingURL=auth.test.js.map