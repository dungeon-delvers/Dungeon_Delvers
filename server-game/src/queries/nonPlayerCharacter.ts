import { pool } from '@/services/database/postgres';

export const getNpcById = async (npcId: number) => {
  const query = {
    text: `SELECT * FROM non_player_character WHERE id = $1`,
    values: [npcId],
  };
};
