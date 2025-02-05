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
exports.getCharacterByID = exports.getPlayerCharactersByUserID = exports.createPlayerCharacter = void 0;
const postgres_1 = require("../services/database/postgres");
const createPlayerCharacter = (id, playerCharacter) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'INSERT INTO player_character (user_id, name, race, gender, class, con, dex, int, mig, per, res, current_health) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
        values: [
            id,
            playerCharacter.name,
            playerCharacter.race,
            playerCharacter.gender,
            playerCharacter.class,
            playerCharacter.con,
            playerCharacter.dex,
            playerCharacter.int,
            playerCharacter.mig,
            playerCharacter.per,
            playerCharacter.res,
            playerCharacter.current_health,
        ],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.createPlayerCharacter = createPlayerCharacter;
const getPlayerCharactersByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM player_character WHERE user_id = $1',
        values: [userID],
    };
    return (yield postgres_1.pool.query(query)).rows;
});
exports.getPlayerCharactersByUserID = getPlayerCharactersByUserID;
const getCharacterByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: 'SELECT * FROM character WHERE id = $1',
        values: [id],
    };
    return (yield postgres_1.pool.query(query)).rows[0];
});
exports.getCharacterByID = getCharacterByID;
//# sourceMappingURL=playerCharacter.js.map