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
exports.generatePasswordHash = exports.generateToken = exports.authenticateJWT = exports.signup = exports.logout = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../loaders/logger"));
const user_1 = require("../queries/user");
const login = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_1.userFromUsernameQuery)(username);
        if (!user) {
            logger_1.default.info('User not found');
            done(null, false, { message: 'User not found' });
            return;
        }
        const verified = yield verifyPassword(password, user.password_hash);
        if (verified) {
            yield (0, user_1.loginUserQuery)(user.id);
            logger_1.default.info('User verified');
            done(null, user);
            return;
        }
        else {
            logger_1.default.info('Incorrect password');
            done(null, false, { message: 'Incorrect password' });
            return;
        }
    }
    catch (error) {
        logger_1.default.error(error);
        done(error);
        return;
    }
});
exports.login = login;
const logout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.logoutUserQuery)(id);
    if (!user) {
        throw new Error('User not found');
    }
});
exports.logout = logout;
const signup = (email, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordHash = yield (0, exports.generatePasswordHash)(password);
        const user = yield (0, user_1.createUserQuery)(email, username, passwordHash);
        if (!user) {
            throw new Error('User not created');
        }
        const token = yield (0, exports.generateToken)(user);
        return { user, token };
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.signup = signup;
const authenticateJWT = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.getUserFromID)(id);
    return user;
});
exports.authenticateJWT = authenticateJWT;
const generateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.jwt.secret, { algorithm: config_1.default.jwt.algorithm });
});
exports.generateToken = generateToken;
const generatePasswordHash = (plaintextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return bcrypt_1.default.hash(plaintextPassword, saltRounds);
});
exports.generatePasswordHash = generatePasswordHash;
const verifyPassword = (plaintextPassword, passwordHash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plaintextPassword, passwordHash);
});
//# sourceMappingURL=auth.js.map