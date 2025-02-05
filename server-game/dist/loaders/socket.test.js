"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./socket"));
jest.mock('socket.io');
jest.mock('@/api/middlewares/isAuth', () => {
    return {
        isAuthSocket: jest.fn((_socket, next) => next()),
    };
});
describe('socketLoader', () => {
    let mockIo;
    beforeEach(() => {
        mockIo = new socket_io_1.Server();
    });
    it('should apply isAuthSocket middleware', () => {
        (0, socket_1.default)(mockIo);
        expect(mockIo.use).toHaveBeenCalled();
    });
    it('should register events', () => {
        (0, socket_1.default)(mockIo);
        expect(mockIo.on).toHaveBeenCalledWith('connection', expect.any(Function));
    });
});
//# sourceMappingURL=socket.test.js.map