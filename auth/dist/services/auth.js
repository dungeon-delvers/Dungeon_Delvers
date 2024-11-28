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
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const postgres_1 = require("./database/postgres");
exports.default = (app) => {
    app.use((0, express_session_1.default)({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'sid',
        cookie: {
            httpOnly: true,
            maxAge: 20 * 60 * 1000,
        },
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((userId, done) => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            value: [userId],
        };
        const { rows } = yield postgres_1.pool.query(query);
        if (rows.length === 0) {
            return done(new Error('User not found'));
        }
        const user = rows[0];
        done(null, user);
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
//# sourceMappingURL=auth.js.map