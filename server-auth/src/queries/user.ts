import { pool } from '@/services/database/postgres';
import { User as DDUser } from '@shared/types/user';

declare global {
  namespace Express {
    interface User extends DDUser {}
  }
}

export const createUserQuery = async (
  email: string,
  username: string,
  passwordHash: string
) => {
  const query = {
    text: 'INSERT INTO app_user (email, password_hash, username) VALUES ($1, $2, $3) RETURNING *',
    values: [email, passwordHash, username],
  };
  const result = await pool.query<DDUser>(query);
  console.log({ result });
  return result.rows[0];
};

export const loginUserQuery = async (id: number) => {
  const query = {
    text: 'UPDATE app_user SET loggedin = true WHERE id = $1 RETURNING *',
    values: [id],
  };
  return (await pool.query(query)).rows[0];
};

export const logoutUserQuery = async (id: number) => {
  const query = {
    text: 'UPDATE app_user SET loggedin = false WHERE id = $1 RETURNING *',
    values: [id],
  };
  return (await pool.query(query)).rows[0];
};

export const userFromUsernameQuery = async (username: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE username = $1',
    values: [username],
  };
  return (await pool.query<DDUser>(query)).rows[0];
};

export const userFromEmailQuery = async (email: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE email = $1',
    values: [email],
  };
  return (await pool.query<DDUser>(query)).rows[0];
};

export const getUserFromID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE id = $1',
    values: [id],
  };
  return (await pool.query<DDUser>(query)).rows[0];
};
