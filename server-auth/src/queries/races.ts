import { pool } from '@/services/database/postgres';
import { RaceData } from 'types/game';

export const getRaces = async () => {
  const query = `SELECT * FROM race_data`;
  return (await pool.query<RaceData>(query)).rows;
};
