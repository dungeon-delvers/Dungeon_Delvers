"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.create = void 0;
const database_1 = require("../database");
const class_1 = require("./class/class");
const FIGHTER = __importStar(require("./class/fighter"));
const HEALER = __importStar(require("./class/healer"));
const MAGE = __importStar(require("./class/mage"));
const SCOUT = __importStar(require("./class/scout"));
const attributes_1 = require("./attributes");
const stats_1 = require("./stats");
const archtypes = {
    [class_1.ARCHTYPES.FIGHTER]: FIGHTER,
    [class_1.ARCHTYPES.HEALER]: HEALER,
    [class_1.ARCHTYPES.MAGE]: MAGE,
    [class_1.ARCHTYPES.SCOUT]: SCOUT,
};
const calculateModifier = (attributeValue, modifier) => {
    return Number((attributeValue - 10) * modifier);
};
const calculateStat = (modifier, baseStat) => {
    if (baseStat) {
        return Math.ceil(Number(((1 + modifier) * baseStat).toFixed(2)));
    }
    return Number((1 + modifier).toFixed(2));
};
const attributeWithinBounds = (value) => {
    if (value < attributes_1.ATTRIBUTE_MIN_CREATION_VALUE) {
        return attributes_1.ATTRIBUTE_MIN_CREATION_VALUE;
    }
    if (value > attributes_1.ATTRIBUTE_MAX_CREATION_VALUE) {
        return attributes_1.ATTRIBUTE_MAX_CREATION_VALUE;
    }
    return value;
};
const BASE_MODIFIERS = {
    [stats_1.STATS.ACCURACY]: 0.01,
    [stats_1.STATS.ACTION_SPEED]: 0.03,
    [stats_1.STATS.AREA_OF_EFFECT]: 0.06,
    [stats_1.STATS.CONCENTRATION]: 0.03,
    [stats_1.STATS.DAMAGE]: 0.03,
    [stats_1.STATS.DEFLECTION]: 0.01,
    [stats_1.STATS.DURATION]: 0.05,
    [stats_1.STATS.FORTITUDE]: 0.02,
    [stats_1.STATS.HEALING]: 0.03,
    [stats_1.STATS.HEALTH]: 0.05,
    [stats_1.STATS.REFLEX]: 0.02,
    [stats_1.STATS.WILLPOWER]: 0.02,
};
const create = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, archtype, attributes: inAttributes }) {
    const attributes = {
        [attributes_1.ATTRIBUTES.CON]: attributeWithinBounds(inAttributes[attributes_1.ATTRIBUTES.CON]),
        [attributes_1.ATTRIBUTES.DEX]: attributeWithinBounds(inAttributes[attributes_1.ATTRIBUTES.DEX]),
        [attributes_1.ATTRIBUTES.INT]: attributeWithinBounds(inAttributes[attributes_1.ATTRIBUTES.INT]),
        [attributes_1.ATTRIBUTES.MIG]: attributeWithinBounds(inAttributes[attributes_1.ATTRIBUTES.MIG]),
        [attributes_1.ATTRIBUTES.PER]: attributeWithinBounds(inAttributes[attributes_1.ATTRIBUTES.PER]),
        [attributes_1.ATTRIBUTES.RES]: attributeWithinBounds(inAttributes[attributes_1.ATTRIBUTES.RES]),
    };
    const stats = {
        [stats_1.STATS.ACCURACY]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.PER], BASE_MODIFIERS[stats_1.STATS.ACCURACY]), archtypes[archtype].BASE_STATS[stats_1.STATS.ACCURACY]),
        [stats_1.STATS.ACTION_SPEED]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.DEX], BASE_MODIFIERS[stats_1.STATS.ACTION_SPEED])),
        [stats_1.STATS.AREA_OF_EFFECT]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.INT], BASE_MODIFIERS[stats_1.STATS.AREA_OF_EFFECT])),
        [stats_1.STATS.CONCENTRATION]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.RES], BASE_MODIFIERS[stats_1.STATS.CONCENTRATION])),
        [stats_1.STATS.DAMAGE]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.MIG], BASE_MODIFIERS[stats_1.STATS.DAMAGE])),
        [stats_1.STATS.DEFLECTION]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.RES], BASE_MODIFIERS[stats_1.STATS.DEFLECTION])),
        [stats_1.STATS.DURATION]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.INT], BASE_MODIFIERS[stats_1.STATS.DURATION])),
        [stats_1.STATS.FORTITUDE]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.CON], BASE_MODIFIERS[stats_1.STATS.FORTITUDE])),
        [stats_1.STATS.HEALING]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.MIG], BASE_MODIFIERS[stats_1.STATS.HEALING])),
        [stats_1.STATS.HEALTH]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.CON], BASE_MODIFIERS[stats_1.STATS.HEALTH]), archtypes[archtype].BASE_STATS[stats_1.STATS.HEALTH]),
        [stats_1.STATS.REFLEX]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.PER], BASE_MODIFIERS[stats_1.STATS.REFLEX]) +
            calculateModifier(attributes[attributes_1.ATTRIBUTES.DEX], BASE_MODIFIERS[stats_1.STATS.REFLEX])),
        [stats_1.STATS.WILLPOWER]: calculateStat(calculateModifier(attributes[attributes_1.ATTRIBUTES.RES], BASE_MODIFIERS[stats_1.STATS.WILLPOWER]) +
            calculateModifier(attributes[attributes_1.ATTRIBUTES.INT], BASE_MODIFIERS[stats_1.STATS.WILLPOWER])),
    };
    const currentHealth = stats[stats_1.STATS.HEALTH]; // Set current health to max health on creation
    yield database_1.client.query({
        text: 'INSERT INTO player_character (name, class, con, dex, int, mig, per, res, current_health) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [
            name,
            archtype,
            attributes[attributes_1.ATTRIBUTES.CON],
            attributes[attributes_1.ATTRIBUTES.DEX],
            attributes[attributes_1.ATTRIBUTES.INT],
            attributes[attributes_1.ATTRIBUTES.MIG],
            attributes[attributes_1.ATTRIBUTES.PER],
            attributes[attributes_1.ATTRIBUTES.RES],
            currentHealth,
        ],
    });
    return {
        name,
        attributes,
        stats,
        currentHealth,
    };
});
exports.create = create;
exports.default = (_io, socket) => {
    socket.on('character:create', (args, callback) => __awaiter(void 0, void 0, void 0, function* () {
        callback(yield (0, exports.create)(args));
    }));
};
//# sourceMappingURL=character.js.map