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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromID = exports.userFromEmailQuery = exports.userFromUsernameQuery = exports.logoutUserQuery = exports.loginUserQuery = exports.createUserQuery = void 0;
const postgres_1 = require("../services/database/postgres");
const createUserQuery = (email, username, passwordHash) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'INSERT INTO app_user (email, password_hash, username) VALUES ($1, $2, $3) RETURNING *',
        values: [email, passwordHash, username],
    };
    const result = yield postgres_1.pool.query(query);
    console.log({ result });
    return result.rows[0];
});
exports.createUserQuery = createUserQuery;
const loginUserQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'UPDATE app_user SET loggedin = true WHERE id = $1 RETURNING *',
        values: [id],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.loginUserQuery = loginUserQuery;
const logoutUserQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'UPDATE app_user SET loggedin = false WHERE id = $1 RETURNING *',
        values: [id],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.logoutUserQuery = logoutUserQuery;
const userFromUsernameQuery = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM app_user WHERE username = $1',
        values: [username],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.userFromUsernameQuery = userFromUsernameQuery;
const userFromEmailQuery = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM app_user WHERE email = $1',
        values: [email],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.userFromEmailQuery = userFromEmailQuery;
const getUserFromID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM app_user WHERE id = $1',
        values: [id],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.getUserFromID = getUserFromID;
//# sourceMappingURL=user.js.map