import Joi from 'joi';
type RegisterUserParams = {
    email: string;
    username: string;
    password: string;
};
export declare const validateUser: (params: RegisterUserParams) => Joi.ValidationResult<any>;
export {};
//# sourceMappingURL=validation.d.ts.map