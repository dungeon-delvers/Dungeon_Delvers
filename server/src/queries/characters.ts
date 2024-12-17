import { pool } from '@/services/database/postgres';
import { IPlayerCharacter } from '@/interfaces/IPlayerCharacter';

export const createPlayerCharacter = async (playerCharacter: IPlayerCharacter) => {
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
      playerCharacter.user_id,
      playerCharacter.name,
      playerCharacter.surname,
      playerCharacter.class,
      playerCharacter.con,
      playerCharacter.dex,
      playerCharacter.int,
      playerCharacter.mig,
      playerCharacter.per,
      playerCharacter.res,
      playerCharacter.level,
      playerCharacter.current_health,
      playerCharacter.zoneId,
      playerCharacter.locX,
      playerCharacter.locY,
      playerCharacter.locZ,
    ],
  };
  return (await pool.query<IPlayerCharacter>(query)).rows[0];
};

export const getPlayerCharactersByUserID = async (userID: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE user_id = $1',
    values: [userID],
  };
  return (await pool.query<IPlayerCharacter>(query)).rows;
};

export const getCharacterByID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM character WHERE id = $1',
    values: [id],
  };
  return (await pool.query<IPlayerCharacter>(query)).rows[0];
};
