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
exports.verifyPassword = exports.generatePasswordHash = exports.userFromUsername = exports.createUser = void 0;
const postgres_1 = require("../services/database/postgres");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (email, passwordHash, username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'INSERT INTO app_user (email, password_hash, username) VALUES ($1, $2, $3)',
        values: [email, passwordHash, username],
    };
    return yield postgres_1.pool.query(query);
});
exports.createUser = createUser;
const userFromUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM app_user WHERE username = $1',
        values: [username],
    };
    const { rows } = yield postgres_1.pool.query(query);
    return rows[0];
});
exports.userFromUsername = userFromUsername;
const generatePasswordHash = (plaintextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return bcrypt_1.default.hash(plaintextPassword, saltRounds);
});
exports.generatePasswordHash = generatePasswordHash;
const verifyPassword = (plaintextPassword, passwordHash) => {
    return bcrypt_1.default.compare(plaintextPassword, passwordHash);
};
exports.verifyPassword = verifyPassword;
