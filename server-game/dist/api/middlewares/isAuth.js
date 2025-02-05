"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthSocket = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const isAuthSocket = (socket, next) => {
    var _a;
    // since you are sending the token with the query
    const token = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.token;
    try {
        const decoded = typeof token === 'string' && jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret, { algorithms: [config_1.default.jwt.algorithm] });
        socket.data.user = decoded;
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        else {
            throw new Error('Invalid token');
        }
    }
    next();
};
exports.isAuthSocket = isAuthSocket;
//# sourceMappingURL=isAuth.js.map