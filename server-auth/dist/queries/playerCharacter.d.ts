import { IPlayerCharacter } from '../interfaces/IPlayerCharacter';
export declare const createPlayerCharacter: (id: any, playerCharacter: IPlayerCharacter) => Promise<IPlayerCharacter>;
export declare const getPlayerCharactersByUserID: (userID: number) => Promise<IPlayerCharacter[]>;
export declare const getCharacterByID: (id: number) => Promise<IPlayerCharacter>;
//# sourceMappingURL=playerCharacter.d.ts.map