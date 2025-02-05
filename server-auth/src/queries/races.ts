import { pool } from '@/services/database/postgres';
import { RaceData } from '@dungeon-delvers/types';

export const getRaces = async () => {
  const query = `SELECT * FROM race_data`;
  return (await pool.query<RaceData>(query)).rows;
};
