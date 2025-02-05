"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./index"));
const auth_1 = __importDefault(require("./routes/auth"));
jest.mock('express', () => ({
    Router: jest.fn(),
}));
jest.mock('./routes/auth');
describe('createRouter', () => {
    it('should create a router and configure auth routes', () => {
        const mockRouter = {
            use: jest.fn(),
            get: jest.fn(),
            post: jest.fn(),
        };
        express_1.Router.mockReturnValue(mockRouter);
        const router = (0, index_1.default)();
        expect(express_1.Router).toHaveBeenCalled();
        expect(auth_1.default).toHaveBeenCalledWith(mockRouter);
        expect(router).toBe(mockRouter);
    });
});
//# sourceMappingURL=index.test.js.map