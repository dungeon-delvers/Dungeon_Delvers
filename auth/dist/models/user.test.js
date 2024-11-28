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
const postgres_1 = require("../services/database/postgres");
const user_1 = require("./user");
// auth/src/models/user.test.ts
jest.mock('../services/database/postgres', () => ({
    pool: {
        query: jest.fn(),
    },
}));
describe('userFromEmail', () => {
    it('should return user data when user is found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            username: 'testuser',
            password_hash: 'hashedpassword',
        };
        postgres_1.pool.query.mockResolvedValue({ rows: [mockUser] });
        const result = yield (0, user_1.userFromUsername)('testuser');
        expect(result).toEqual(mockUser);
        expect(postgres_1.pool.query).toHaveBeenCalledWith({
            text: 'SELECT * FROM app_user WHERE username = $1',
            values: ['testuser'],
        });
    }));
    it('should return undefined when no user is found', () => __awaiter(void 0, void 0, void 0, function* () {
        postgres_1.pool.query.mockResolvedValue({ rows: [] });
        const result = yield (0, user_1.userFromUsername)('nonexistentuser');
        expect(result).toBeUndefined();
        expect(postgres_1.pool.query).toHaveBeenCalledWith({
            text: 'SELECT * FROM app_user WHERE username = $1',
            values: ['nonexistentuser'],
        });
    }));
});
//# sourceMappingURL=user.test.js.map