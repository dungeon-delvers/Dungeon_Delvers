import { IPlayerCharacter } from '../interfaces/IPlayerCharacter';
export declare const createPlayerCharacter: (playerCharacter: IPlayerCharacter) => Promise<IPlayerCharacter>;
export declare const getPlayerCharactersByUserID: (userID: number) => Promise<IPlayerCharacter[]>;
export declare const getCharacterByID: (id: number) => Promise<IPlayerCharacter>;
//# sourceMappingURL=characters.d.ts.map