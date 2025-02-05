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
const celebrate_1 = require("celebrate");
const passport_1 = __importDefault(require("passport"));
const logger_1 = __importDefault(require("../../loaders/logger"));
const auth_1 = require("../../services/auth");
exports.default = (router) => {
    router.post('/login', (0, celebrate_1.celebrate)({ body: { username: celebrate_1.Joi.string(), password: celebrate_1.Joi.string() } }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate('local', { session: false }, (error, user) => {
            if (error) {
                logger_1.default.error(error);
                next(error);
                return;
            }
            if (!user) {
                res.status(401).json({ error: 'Invalid username or password' });
                return;
            }
            req.login(user, { session: false }, (loginError) => __awaiter(void 0, void 0, void 0, function* () {
                if (loginError) {
                    logger_1.default.error(loginError);
                    next(loginError);
                    return;
                }
                const token = yield (0, auth_1.generateToken)(user);
                res.status(200).json({ token });
            }));
        })(req, res);
    }));
    router.post('/logout', (0, celebrate_1.celebrate)({ body: { id: celebrate_1.Joi.number().required() } }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, auth_1.logout)(req.body.id);
            res.status(200).json({ message: 'User logged out' });
        }
        catch (error) {
            logger_1.default.error(error);
            next(error);
        }
    }));
    router.post('/signup', (0, celebrate_1.celebrate)({
        body: {
            email: celebrate_1.Joi.string().email().required(),
            username: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
        },
    }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token } = yield (0, auth_1.signup)(req.body.email, req.body.username, req.body.password);
            if (!token) {
                res.status(500).json({ error: 'User not created' });
                return;
            }
            res.status(200).json({ token });
        }
        catch (error) {
            if (error instanceof Error) {
                next(error);
            }
            else {
                throw new Error('Encountered unexpected error when trying to return error, might not have been an Error thrown.');
            }
        }
    }));
};
//# sourceMappingURL=auth.js.map