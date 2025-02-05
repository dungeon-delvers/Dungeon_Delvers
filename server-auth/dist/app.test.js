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
const config_1 = __importDefault(require("./config"));
describe('startServer', () => {
    let app;
    let loaders;
    let express;
    let info;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.resetModules();
        jest.restoreAllMocks();
        jest.mock('./config', () => (Object.assign(Object.assign({}, config_1.default), { port: 4001 })));
        app = {
            listen: jest.fn((_port, callback) => {
                callback();
            }),
            use: jest.fn(),
        };
        express = jest.fn(() => app);
        loaders = jest.fn();
        jest.mock('express', () => express);
        jest.mock('./loaders', () => loaders);
        info = jest.fn();
        jest.mock('./loaders/logger', () => ({
            info,
        }));
        // Doing this in the test, caused it to expect statements to fail
        yield Promise.resolve().then(() => __importStar(require('./app')));
    }));
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });
    it('should start the server and log the correct message', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(express).toHaveBeenCalled();
        expect(loaders).toHaveBeenCalled();
        expect(app.listen).toHaveBeenCalledWith(4001, expect.any(Function));
        expect(info).toHaveBeenCalledWith(expect.stringContaining('Auth Server listening on port: 4001'));
    }));
});
//# sourceMappingURL=app.test.js.map