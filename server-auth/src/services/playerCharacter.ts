import {
  createPlayerCharacter,
  getPlayerCharactersByUserID,
  PlayerCharacter,
} from '@/queries/playerCharacter';

export const getCharacters = async (id: number) => {
  return getPlayerCharactersByUserID(id);
};

export const createCharacter = async (
  id: number,
  character: PlayerCharacter
) => {
  return createPlayerCharacter(id, character);
};
