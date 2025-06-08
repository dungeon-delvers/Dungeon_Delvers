import { pool } from '@/services/database/postgres';
import {
  PlayerCharacterCreationProps,
  PlayerCharacterQueryResult,
} from '@shared/types/playerCharacter';

export const createPlayerCharacter = async (
  id: number,
  playerCharacter: PlayerCharacterCreationProps
) => {
  const query = {
    text: `
    INSERT INTO player_character (
      user_id,
      name,
      race,
      gender,
      player_class,
      constitution,
      dexterity,
      intellect,
      might,
      perception,
      resolve,
      zone_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    values: [
      id,
      playerCharacter.name,
      playerCharacter.race,
      playerCharacter.gender,
      playerCharacter.playerClass,
      playerCharacter.constitution,
      playerCharacter.dexterity,
      playerCharacter.intellect,
      playerCharacter.might,
      playerCharacter.perception,
      playerCharacter.resolve,
      1, // Default zone_id, can be changed later
    ],
  };
  return (await pool.query<PlayerCharacterQueryResult>(query)).rows[0];
};

export const getPlayerCharactersByUserID = async (userID: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE user_id = $1',
    values: [userID],
  };
  return (await pool.query<PlayerCharacterQueryResult>(query)).rows;
};

export const getCharacterByID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM character WHERE id = $1',
    values: [id],
  };
  return (await pool.query<PlayerCharacterQueryResult>(query)).rows[0];
};
