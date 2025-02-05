"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../loaders/logger"));
exports.default = (io) => {
    io.on('connection', () => {
        logger_1.default.info('User connected');
    });
};
//# sourceMappingURL=login.js.map