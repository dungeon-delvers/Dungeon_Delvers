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
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("./logger"));
const index_1 = __importDefault(require("./index"));
jest.mock('./express');
jest.mock('./logger');
describe('Loader', () => {
    let app;
    beforeEach(() => {
        app = {};
    });
    it('should call expressLoader with expressApp', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, index_1.default)(app);
        expect(express_1.default).toHaveBeenCalledWith(app);
    }));
    it('should log that Express is loaded', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, index_1.default)(app);
        expect(logger_1.default.info).toHaveBeenCalledWith('✌️ Express loaded');
    }));
});
