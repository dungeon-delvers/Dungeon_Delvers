import {
  createPlayerCharacter,
  getPlayerCharactersByUserID,
} from '@/queries/playerCharacter';
import { PlayerCharacter } from 'types/game';

export const getCharacters = async (id: number) => {
  return getPlayerCharactersByUserID(id);
};

export const createCharacter = async (
  id: number,
  character: PlayerCharacter
) => {
  return createPlayerCharacter(id, character);
};
