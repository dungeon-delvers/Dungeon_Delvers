import { IPlayerCharacter } from '@/interfaces/IPlayerCharacter';
import { createPlayerCharacter, getPlayerCharactersByUserID } from '@/queries/playerCharacter';

export const getCharacters = async (id: number) => {
  return getPlayerCharactersByUserID(id);
};

export const createCharacter = async (id: number, character: IPlayerCharacter) => {
  return createPlayerCharacter(id, character);
};
