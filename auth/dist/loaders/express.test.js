"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config"));
const api_1 = __importDefault(require("../api"));
const auth_1 = __importDefault(require("../services/auth"));
const express_1 = __importDefault(require("./express"));
const express = jest.fn(() => ({
    get: jest.fn(),
    head: jest.fn(),
    enable: jest.fn(),
    use: jest.fn(),
    json: jest.fn(),
}));
jest.mock('cors', () => jest.fn());
jest.mock('../config', () => ({
    api: {
        prefix: '/api',
    },
}));
jest.mock('../api', () => jest.fn());
jest.mock('../services/auth', () => jest.fn());
describe('Express Loader', () => {
    let app;
    beforeEach(() => {
        app = express();
        jest.mock('express', () => {
            express;
        });
    });
    it('should set up status routes', () => {
        (0, express_1.default)(app);
        app.get('/status', expect.any(Function));
        expect(app.get).toHaveBeenCalledWith('/status', expect.any(Function));
        expect(app.head).toHaveBeenCalledWith('/status', expect.any(Function));
    });
    it('should return 200 on a get /status', () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            end: jest.fn(),
        };
        (0, express_1.default)(app);
        const callback = app.get.mock.calls[0][1];
        callback({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.end).toHaveBeenCalled();
    });
    it('should return 200 on a head /status', () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            end: jest.fn(),
        };
        (0, express_1.default)(app);
        const callback = app.head.mock.calls[0][1];
        callback({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.end).toHaveBeenCalled();
    });
    it('should enable trust proxy', () => {
        (0, express_1.default)(app);
        expect(app.enable).toHaveBeenCalledWith('trust proxy');
    });
    it('should use cors middleware', () => {
        (0, express_1.default)(app);
        expect(app.use).toHaveBeenCalledWith((0, cors_1.default)());
    });
    it('should use express.json middleware', () => {
        (0, express_1.default)(app);
        expect(app.use).toHaveBeenCalledWith(app.json());
    });
    it('should call auth service', () => {
        (0, express_1.default)(app);
        expect(auth_1.default).toHaveBeenCalledWith(app);
    });
    it('should use routes with api prefix', () => {
        (0, express_1.default)(app);
        expect(app.use).toHaveBeenCalledWith(config_1.default.api.prefix, (0, api_1.default)());
    });
});
