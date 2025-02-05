"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromID = void 0;
const postgres_1 = require("../services/database/postgres");
const getUserFromID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM app_user WHERE id = $1',
        values: [id],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.getUserFromID = getUserFromID;
//# sourceMappingURL=user.js.map