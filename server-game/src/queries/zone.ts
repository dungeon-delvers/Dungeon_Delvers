import { pool } from '@/services/database/postgres';

export const getZoneById = async (zoneId: number) => {
  const query = {
    text: `SELECT * FROM zone WHERE id = $1`,
    values: [zoneId],
  };
  return (await pool.query(query)).rows[0];
};
