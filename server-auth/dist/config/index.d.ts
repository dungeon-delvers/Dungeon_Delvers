import { Algorithm } from 'jsonwebtoken';
declare const _default: {
    api: {
        prefix: string;
    };
    /**
     * Your favorite port
     */
    port: number;
    database: {
        user: string | undefined;
        host: string | undefined;
        database: string | undefined;
        password: string | undefined;
        port: number;
    };
    jwt: {
        secret: string;
        algorithm: Algorithm;
    };
    logs: {
        level: string;
    };
    errorMsg: {
        internalError: string;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map