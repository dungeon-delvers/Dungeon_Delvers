"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const user_1 = require("../queries/user");
const authenticateJWT = (id) => {
    return (0, user_1.getUserFromID)(id);
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.js.map