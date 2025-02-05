import { IUser } from '@/interfaces/IUser';
import { pool } from '@/services/database/postgres';

export const getUserFromID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE id = $1',
    values: [id],
  };
  return (await pool.query<IUser>(query)).rows[0];
};
