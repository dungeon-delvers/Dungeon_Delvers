import { pool } from '@/services/database/postgres';
import { RaceProps } from '@shared/types/race';

export const getRaces = async () => {
  const query = `SELECT * FROM race_data`;
  return (await pool.query<RaceProps>(query)).rows;
};
