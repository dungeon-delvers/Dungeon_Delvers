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
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../loaders/logger"));
const user_1 = require("../queries/user");
const auth_1 = require("./auth");
jest.mock('bcrypt');
jest.mock('@/queries/user');
jest.mock('@/loaders/logger');
describe('login', () => {
    const mockDone = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return an error if the user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.userFromUsernameQuery.mockResolvedValue(null);
        yield (0, auth_1.login)('testuser', 'password', mockDone);
        expect(user_1.userFromUsernameQuery).toHaveBeenCalledWith('testuser');
        expect(logger_1.default.info).toHaveBeenCalledWith('User not found');
        expect(mockDone).toHaveBeenCalledWith(null, false, { message: 'User not found' });
    }));
    it('should return an error if the password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', password_hash: 'hashedpassword' };
        user_1.userFromUsernameQuery.mockResolvedValue(mockUser);
        bcrypt_1.default.compare.mockResolvedValue(false);
        yield (0, auth_1.login)('testuser', 'password', mockDone);
        expect(user_1.userFromUsernameQuery).toHaveBeenCalledWith('testuser');
        expect(bcrypt_1.default.compare).toHaveBeenCalledWith('password', 'hashedpassword');
        expect(logger_1.default.info).toHaveBeenCalledWith('Incorrect password');
        expect(mockDone).toHaveBeenCalledWith(null, false, { message: 'Incorrect password' });
    }));
    it('should return the user if the password is correct', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', password_hash: 'hashedpassword' };
        user_1.userFromUsernameQuery.mockResolvedValue(mockUser);
        bcrypt_1.default.compare.mockResolvedValue(true);
        yield (0, auth_1.login)('testuser', 'password', mockDone);
        expect(user_1.userFromUsernameQuery).toHaveBeenCalledWith('testuser');
        expect(bcrypt_1.default.compare).toHaveBeenCalledWith('password', 'hashedpassword');
        expect(user_1.loginUserQuery).toHaveBeenCalledWith(mockUser.id);
        expect(logger_1.default.info).toHaveBeenCalledWith('User verified');
        expect(mockDone).toHaveBeenCalledWith(null, mockUser);
    }));
    it('should handle errors correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error('Test error');
        user_1.userFromUsernameQuery.mockRejectedValue(mockError);
        yield (0, auth_1.login)('testuser', 'password', mockDone);
        expect(user_1.userFromUsernameQuery).toHaveBeenCalledWith('testuser');
        expect(logger_1.default.error).toHaveBeenCalledWith(mockError);
        expect(mockDone).toHaveBeenCalledWith(mockError);
    }));
});
//# sourceMappingURL=auth.test.js.map