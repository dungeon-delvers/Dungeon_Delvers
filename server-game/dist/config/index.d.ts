import { Algorithm } from 'jsonwebtoken';
declare const _default: {
    env: string;
    api: {
        prefix: string;
    };
    /**
     * Your favorite port
     */
    port: number;
    client: {
        url: string | undefined;
        port: number;
    };
    database: {
        user: string | undefined;
        host: string | undefined;
        database: string | undefined;
        password: string | undefined;
        port: number;
    };
    jwt: {
        algorithm: Algorithm;
        secret: string;
    };
    logs: {
        level: string;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map