"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUser = (params) => joi_1.default.object()
    .keys({
    email: joi_1.default.string().email().max(50).required(),
    username: joi_1.default.string().alphanum().min(3).max(20).required(),
    password: joi_1.default.string().min(8).required(),
    passwordRepeat: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .options({ messages: { any: { allowOnly: 'must match password' } } }),
})
    .validate(params);
exports.validateUser = validateUser;
