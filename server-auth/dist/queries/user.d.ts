import { IUser } from '../interfaces/IUser';
declare global {
    namespace Express {
        interface User extends IUser {
        }
    }
}
export declare const createUserQuery: (email: string, username: string, passwordHash: string) => Promise<IUser>;
export declare const loginUserQuery: (id: number) => Promise<any>;
export declare const logoutUserQuery: (id: number) => Promise<any>;
export declare const userFromUsernameQuery: (username: string) => Promise<IUser>;
export declare const userFromEmailQuery: (email: string) => Promise<IUser>;
export declare const getUserFromID: (id: number) => Promise<IUser>;
//# sourceMappingURL=user.d.ts.map