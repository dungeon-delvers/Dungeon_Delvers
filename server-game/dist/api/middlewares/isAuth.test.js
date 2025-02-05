"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth_1 = require("./isAuth");
const config_1 = __importDefault(require("../../config"));
jest.mock('jsonwebtoken');
describe('isAuth middleware', () => {
    let socket;
    let next;
    beforeEach(() => {
        socket = {
            handshake: {
                address: '::1',
                auth: {},
                headers: {},
                issued: 1630000000000,
                query: {
                    token: 'validtoken',
                },
                secure: false,
                time: new Date().toISOString(),
                url: '/socket.io/?token=validtoken&EIO=4&transport=polling&t=NC1Z5VU',
                xdomain: false,
            },
            data: {},
        };
        next = jest.fn();
    });
    it('should set user data on the socket if the token is valid', () => {
        const decodedToken = { id: 1, name: 'Test User' };
        jsonwebtoken_1.default.verify.mockReturnValue(decodedToken);
        (0, isAuth_1.isAuthSocket)(socket, next);
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('validtoken', config_1.default.jwt.secret, { algorithms: [config_1.default.jwt.algorithm] });
        expect(socket.data.user).toEqual(decodedToken);
        expect(next).toHaveBeenCalledWith();
    });
    it('should call next with an error if the token is invalid', () => {
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });
        (0, isAuth_1.isAuthSocket)(socket, next);
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('validtoken', config_1.default.jwt.secret, { algorithms: [config_1.default.jwt.algorithm] });
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next.mock.calls[0][0].message).toBe('Invalid token');
    });
    it('should call next with an error if there is no token', () => {
        const sampleSocket = {
            handshake: {
                query: {
                    token: undefined,
                },
            },
        };
        (0, isAuth_1.isAuthSocket)(sampleSocket, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next.mock.calls[0][0].message).toBe("Cannot set properties of undefined (setting 'user')");
    });
});
//# sourceMappingURL=isAuth.test.js.map