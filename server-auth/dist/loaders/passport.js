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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = require("passport-local");
const logger_1 = __importDefault(require("../loaders/logger"));
const user_1 = require("../queries/user");
const auth_1 = require("../services/auth");
const config_1 = __importDefault(require("../config"));
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const JwtStrategy = passport_jwt_1.default.Strategy;
const strategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwt.secret,
}, (jwt_payload, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Payload received', jwt_payload);
    const user = yield (0, auth_1.authenticateJWT)(jwt_payload.id);
    if (user) {
        next(null, user);
    }
    else {
        next(null, false);
    }
}));
exports.default = (app) => {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.use(new passport_local_1.Strategy(auth_1.login));
    passport_1.default.use(strategy);
    passport_1.default.serializeUser((user, done) => {
        logger_1.default.info(`Serializing user: ${user.username}`);
        done(null, user);
    });
    passport_1.default.deserializeUser((inUser, done) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info(`Serializing user: ${inUser.username}`);
        const user = yield (0, user_1.userFromUsernameQuery)(inUser.username);
        done(null, user);
    }));
    app.use(passport_1.default.authenticate('session'));
};
//# sourceMappingURL=passport.js.map