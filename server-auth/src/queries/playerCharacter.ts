import { PlayerCharacter, PlayerCharacterCreation } from 'types/game';

import { pool } from '@/services/database/postgres';

export const createPlayerCharacter = async (
  id: number,
  playerCharacter: PlayerCharacterCreation
) => {
  const query = {
    text: `
    INSERT INTO player_character (
      user_id,
      name,
      race,
      gender,
      class,
      "CON",
      "DEX",
      "INT",
      "MIG",
      "PER",
      "RES"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    values: [
      id,
      playerCharacter.name,
      playerCharacter.race,
      playerCharacter.gender,
      playerCharacter.playerClass,
      playerCharacter.attributes.CON,
      playerCharacter.attributes.DEX,
      playerCharacter.attributes.INT,
      playerCharacter.attributes.MIG,
      playerCharacter.attributes.PER,
      playerCharacter.attributes.RES,
    ],
  };
  return (await pool.query<PlayerCharacterCreation>(query)).rows[0];
};

export const getPlayerCharactersByUserID = async (userID: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE user_id = $1',
    values: [userID],
  };
  return (await pool.query<PlayerCharacterCreation | PlayerCharacter>(query))
    .rows;
};

export const getCharacterByID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM character WHERE id = $1',
    values: [id],
  };
  return (await pool.query<PlayerCharacterCreation | PlayerCharacter>(query))
    .rows[0];
};
