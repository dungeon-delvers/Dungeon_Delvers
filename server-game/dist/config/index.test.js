"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('Config', () => {
    it('should load development config by default', () => {
        const expectedConfig = {
            env: 'test',
            api: {
                prefix: '/api',
            },
            client: {
                url: 'http://localhost',
                port: 3000,
            },
            port: 8080,
            database: {
                user: 'test_user',
                host: 'test-host',
                database: 'test-db',
                password: 'test-password',
                port: 5454,
            },
            jwt: {
                algorithm: 'HS256',
                secret: 'TEST_JWT_SECRET',
            },
            logs: {
                level: 'silly',
            },
        };
        expect(index_1.default).toEqual(expectedConfig);
    });
});
//# sourceMappingURL=index.test.js.map