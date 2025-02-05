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
const index_1 = __importDefault(require("./index"));
const socket_1 = __importDefault(require("./socket"));
jest.mock('socket.io');
jest.mock('./socket');
jest.mock('./logger', () => ({
    info: jest.fn(),
}));
describe('indexLoader', () => {
    let mockApp;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.clearAllMocks();
        mockApp = {};
        process.env.NODE_ENV = 'development';
        yield (0, index_1.default)(mockApp);
    }));
    it('should load socket and log info in non-test environment', () => {
        expect(socket_1.default).toHaveBeenCalledWith(mockApp);
    });
});
//# sourceMappingURL=index.test.js.map