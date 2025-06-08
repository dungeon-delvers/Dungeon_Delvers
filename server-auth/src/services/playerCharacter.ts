import {
  createPlayerCharacter,
  getPlayerCharactersByUserID,
} from '@/queries/playerCharacter';
import { PlayerCharacterCreationProps } from '@shared/types/playerCharacter';

export const getCharacters = async (id: number) => {
  return getPlayerCharactersByUserID(id);
};

export const createCharacter = async (
  id: number,
  character: PlayerCharacterCreationProps
) => {
  return createPlayerCharacter(id, character);
};
