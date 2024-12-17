import { IPlayerCharacter } from '@/interfaces/IPlayerCharacter';
import { pool } from '@/services/database/postgres';

export const createPlayerCharacter = async (id, playerCharacter: IPlayerCharacter) => {
  const query = {
    text: 'INSERT INTO player_character (user_id, name, race, gender, class, con, dex, int, mig, per, res, current_health) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    values: [
      id,
      playerCharacter.name,
      playerCharacter.race,
      playerCharacter.gender,
      playerCharacter.class,
      playerCharacter.con,
      playerCharacter.dex,
      playerCharacter.int,
      playerCharacter.mig,
      playerCharacter.per,
      playerCharacter.res,
      playerCharacter.current_health,
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
