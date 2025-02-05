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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playerCharacter_1 = require("../../services/playerCharacter");
const passport_1 = __importDefault(require("passport"));
exports.default = (app) => {
    app.get('/characters', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            res.status(200).json({ characters: yield (0, playerCharacter_1.getCharacters)(req.user.id) });
        }
        else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }));
    app.post('/character/create', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            res.status(200).json({ character: yield (0, playerCharacter_1.createCharacter)(req.user.id, req.body) });
        }
        else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }));
};
//# sourceMappingURL=characters.js.map