import { VerifyFunction } from 'passport-local';
export declare const login: VerifyFunction;
export declare const logout: (id: number) => Promise<void>;
export declare const signup: (email: string, username: string, password: string) => Promise<{
    user: import("../interfaces/IUser").IUser;
    token: string;
}>;
export declare const authenticateJWT: (id: number) => Promise<import("../interfaces/IUser").IUser>;
export declare const generateToken: (user: any) => Promise<string>;
export declare const generatePasswordHash: (plaintextPassword: string) => Promise<string>;
//# sourceMappingURL=auth.d.ts.map