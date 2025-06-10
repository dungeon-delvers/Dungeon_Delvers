import { pool } from '@/services/database/postgres';
import { CharacterQueryResult } from '@shared/types/character';

export const getNpcById = async (npcId: number) => {
  const query = {
    text: `SELECT * FROM non_player_character WHERE id = $1`,
    values: [npcId],
  };
  return (await pool.query<CharacterQueryResult>(query)).rows[0];
};
