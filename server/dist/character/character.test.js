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
const node_http_1 = require("node:http");
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
const character_1 = __importStar(require("./character"));
const class_1 = require("./class/class");
const attributes_1 = require("./attributes");
const stats_1 = require("./stats");
const database_1 = require("../database");
jest.mock('../database', () => ({
    client: {
        connect: jest.fn(),
        query: jest.fn(),
    },
}));
const characterArgs = {
    name: 'Test Character',
    archtype: class_1.ARCHTYPES.FIGHTER,
    attributes: {
        [attributes_1.ATTRIBUTES.CON]: 20,
        [attributes_1.ATTRIBUTES.DEX]: 16,
        [attributes_1.ATTRIBUTES.INT]: 2,
        [attributes_1.ATTRIBUTES.MIG]: 11,
        [attributes_1.ATTRIBUTES.PER]: 15,
        [attributes_1.ATTRIBUTES.RES]: 10,
    },
};
const characterResult = {
    name: 'Test Character',
    stats: {
        [stats_1.STATS.ACCURACY]: 27,
        [stats_1.STATS.ACTION_SPEED]: 1.18,
        [stats_1.STATS.AREA_OF_EFFECT]: 0.58,
        [stats_1.STATS.CONCENTRATION]: 1,
        [stats_1.STATS.DAMAGE]: 1.03,
        [stats_1.STATS.DEFLECTION]: 1,
        [stats_1.STATS.DURATION]: 0.65,
        [stats_1.STATS.FORTITUDE]: 1.16,
        [stats_1.STATS.HEALING]: 1.03,
        [stats_1.STATS.HEALTH]: 59,
        [stats_1.STATS.REFLEX]: 1.22,
        [stats_1.STATS.WILLPOWER]: 0.86,
    },
    currentHealth: 59,
    attributes: {
        [attributes_1.ATTRIBUTES.CON]: 18,
        [attributes_1.ATTRIBUTES.DEX]: 16,
        [attributes_1.ATTRIBUTES.INT]: 3,
        [attributes_1.ATTRIBUTES.MIG]: 11,
        [attributes_1.ATTRIBUTES.PER]: 15,
        [attributes_1.ATTRIBUTES.RES]: 10,
    },
};
describe('Character', () => {
    beforeAll(() => {
        database_1.client.connect();
    });
    it('should create a character with the correct stats and attributes', () => __awaiter(void 0, void 0, void 0, function* () {
        const character = yield (0, character_1.create)(characterArgs);
        expect(character.attributes[attributes_1.ATTRIBUTES.CON]).toEqual(characterResult.attributes[attributes_1.ATTRIBUTES.CON]);
        expect(character.attributes[attributes_1.ATTRIBUTES.DEX]).toEqual(characterResult.attributes[attributes_1.ATTRIBUTES.DEX]);
        expect(character.attributes[attributes_1.ATTRIBUTES.INT]).toEqual(characterResult.attributes[attributes_1.ATTRIBUTES.INT]);
        expect(character.attributes[attributes_1.ATTRIBUTES.MIG]).toEqual(characterResult.attributes[attributes_1.ATTRIBUTES.MIG]);
        expect(character.attributes[attributes_1.ATTRIBUTES.PER]).toEqual(characterResult.attributes[attributes_1.ATTRIBUTES.PER]);
        expect(character.attributes[attributes_1.ATTRIBUTES.RES]).toEqual(characterResult.attributes[attributes_1.ATTRIBUTES.RES]);
        expect(character.stats[stats_1.STATS.ACCURACY]).toEqual(characterResult.stats[stats_1.STATS.ACCURACY]);
        expect(character.stats[stats_1.STATS.ACTION_SPEED]).toEqual(characterResult.stats[stats_1.STATS.ACTION_SPEED]);
        expect(character.stats[stats_1.STATS.AREA_OF_EFFECT]).toEqual(characterResult.stats[stats_1.STATS.AREA_OF_EFFECT]);
        expect(character.stats[stats_1.STATS.CONCENTRATION]).toEqual(characterResult.stats[stats_1.STATS.CONCENTRATION]);
        expect(character.stats[stats_1.STATS.DAMAGE]).toEqual(characterResult.stats[stats_1.STATS.DAMAGE]);
        expect(character.stats[stats_1.STATS.DEFLECTION]).toEqual(characterResult.stats[stats_1.STATS.DEFLECTION]);
        expect(character.stats[stats_1.STATS.DURATION]).toEqual(characterResult.stats[stats_1.STATS.DURATION]);
        expect(character.stats[stats_1.STATS.FORTITUDE]).toEqual(characterResult.stats[stats_1.STATS.FORTITUDE]);
        expect(character.stats[stats_1.STATS.HEALING]).toEqual(characterResult.stats[stats_1.STATS.HEALING]);
        expect(character.stats[stats_1.STATS.HEALTH]).toEqual(characterResult.stats[stats_1.STATS.HEALTH]);
        expect(character.stats[stats_1.STATS.REFLEX]).toEqual(characterResult.stats[stats_1.STATS.REFLEX]);
        expect(character.stats[stats_1.STATS.WILLPOWER]).toEqual(characterResult.stats[stats_1.STATS.WILLPOWER]);
        expect(character.currentHealth).toEqual(characterResult.currentHealth);
        expect(database_1.client.query).toHaveBeenCalled();
    }));
});
describe('Character eventHandler', () => {
    let io;
    let serverSocket;
    let clientSocket;
    beforeAll(done => {
        const httpServer = (0, node_http_1.createServer)();
        io = new socket_io_1.Server(httpServer);
        httpServer.listen(() => {
            const { port } = httpServer.address();
            clientSocket = (0, socket_io_client_1.io)(`http://localhost:${port}`);
            io.on('connection', socket => {
                serverSocket = socket;
                (0, character_1.default)(io, socket);
            });
            clientSocket.on('connect', done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.disconnect();
    });
    test('create should be called', done => {
        clientSocket.emit('character:create', characterArgs, (args) => {
            expect(args).toEqual(characterResult);
            expect(database_1.client.query).toHaveBeenCalled();
            done();
        });
    });
});
//# sourceMappingURL=character.test.js.map