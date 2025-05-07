import { pool } from '@/services/database/postgres';
import { PlayerCharacter } from 'types/game';

export const createPlayerCharacter = async (
  playerCharacter: PlayerCharacter
) => {
  const query = {
    text: `INSERT INTO player_character
    (
      user_id,
      name,
      class,
      con,
      dex,
      int,
      mig,
      per,
      res,
      current_health,
      zoneId,
      locX,
      locY,
      locZ
    )
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
    values: [
      playerCharacter.userId,
      playerCharacter.name,
      playerCharacter.surname,
      playerCharacter.playerClass,
      playerCharacter.attributes.CON,
      playerCharacter.attributes.DEX,
      playerCharacter.attributes.INT,
      playerCharacter.attributes.MIG,
      playerCharacter.attributes.PER,
      playerCharacter.attributes.RES,
      playerCharacter.level,
      playerCharacter.stats.currentHealth,
      playerCharacter.zoneId,
      playerCharacter.position._x,
      playerCharacter.position._y,
      playerCharacter.position._z,
    ],
  };
  return (await pool.query<PlayerCharacter>(query)).rows[0];
};

export const getPlayerCharactersByUserID = async (userID: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE user_id = $1',
    values: [userID],
  };
  return (await pool.query<PlayerCharacter>(query)).rows;
};

export const getCharacterByID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE id = $1',
    values: [id],
  };
  const result = await pool.query<PlayerCharacter>(query);
  return result.rows[0];
};
