import { ATTRIBUTE, PlayerCharacter, PlayerCharacterCreation } from '@dungeon-delvers/types';

import { pool } from '@/services/database/postgres';

export const createPlayerCharacter = async (id, playerCharacter: PlayerCharacterCreation) => {
  const query = {
    text: `
    INSERT INTO player_character (
    user_id,
    name,
    race,
    gender,
    class,
    "${ATTRIBUTE.CON}",
    "${ATTRIBUTE.DEX}",
    "${ATTRIBUTE.INT}",
    "${ATTRIBUTE.MIG}",
    "${ATTRIBUTE.PER}",
    "${ATTRIBUTE.RES}")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    values: [
      id,
      playerCharacter.name,
      playerCharacter.race,
      playerCharacter.gender,
      playerCharacter.class,
      playerCharacter[ATTRIBUTE.CON],
      playerCharacter[ATTRIBUTE.DEX],
      playerCharacter[ATTRIBUTE.INT],
      playerCharacter[ATTRIBUTE.MIG],
      playerCharacter[ATTRIBUTE.PER],
      playerCharacter[ATTRIBUTE.RES],
    ],
  };
  return (await pool.query<PlayerCharacterCreation>(query)).rows[0];
};

export const getPlayerCharactersByUserID = async (userID: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE user_id = $1',
    values: [userID],
  };
  return (await pool.query<PlayerCharacterCreation | PlayerCharacter>(query)).rows;
};

export const getCharacterByID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM character WHERE id = $1',
    values: [id],
  };
  return (await pool.query<PlayerCharacterCreation | PlayerCharacter>(query)).rows[0];
};
