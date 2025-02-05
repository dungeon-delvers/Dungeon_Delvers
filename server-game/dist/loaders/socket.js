"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const isAuth_1 = require("../api/middlewares/isAuth");
const logger_1 = __importDefault(require("./logger"));
exports.default = (io) => {
    console.log(isAuth_1.isAuthSocket);
    logger_1.default.info('✌️ Socket.IO is loading');
    (0, api_1.events)(io);
    io.use((socket, next) => {
        (0, isAuth_1.isAuthSocket)(socket, next);
        next();
    });
    logger_1.default.info('✌️ Socket.IO loaded');
};
//# sourceMappingURL=socket.js.map