export declare const createUser: (email: string, passwordHash: string, username: string) => Promise<import("pg").QueryResult<any>>;
export declare const loginUser: (username: string, password: string) => Promise<any>;
export declare const userFromUsername: (username: string) => Promise<any>;
export declare const userFromEmail: (email: string) => Promise<any>;
export declare const generatePasswordHash: (plaintextPassword: string) => Promise<string>;
export declare const verifyPassword: (plaintextPassword: string, passwordHash: string) => Promise<boolean>;
//# sourceMappingURL=user.d.ts.map