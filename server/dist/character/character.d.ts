import { Server, Socket } from 'socket.io';
import { ARCHTYPES } from './class/class';
import { ATTRIBUTES } from './attributes';
import { STATS } from './stats';
export type Attributes = {
    [ATTRIBUTES.CON]: number;
    [ATTRIBUTES.DEX]: number;
    [ATTRIBUTES.INT]: number;
    [ATTRIBUTES.MIG]: number;
    [ATTRIBUTES.PER]: number;
    [ATTRIBUTES.RES]: number;
};
export type CharacterCreationArgs = {
    name: string;
    archtype: ARCHTYPES;
    attributes: Attributes;
};
export type Character = {
    name: string;
    attributes: Attributes;
    stats: {
        [key in STATS]: number;
    };
    currentHealth: number;
};
export declare const create: ({ name, archtype, attributes: inAttributes }: CharacterCreationArgs) => Promise<{
    name: string;
    attributes: {
        CONSTITUTION: number;
        DEXTERITY: number;
        INTELLECT: number;
        MIGHT: number;
        PERCEPTION: number;
        RESOLVE: number;
    };
    stats: {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        10: number;
        11: number;
    };
    currentHealth: number;
}>;
declare const _default: (_io: Server, socket: Socket) => void;
export default _default;
//# sourceMappingURL=character.d.ts.map