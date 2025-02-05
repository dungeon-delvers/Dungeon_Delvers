"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const login_1 = __importDefault(require("./events/login"));
const events = (io) => {
    (0, login_1.default)(io);
};
exports.events = events;
//# sourceMappingURL=index.js.map