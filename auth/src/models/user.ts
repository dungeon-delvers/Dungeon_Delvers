import { pool } from '../services/database/postgres';
import bcrypt from 'bcrypt';

export const createUser = async (email: string, passwordHash: string, username: string) => {
  const query = {
    text: 'INSERT INTO app_user (email, password_hash, username) VALUES ($1, $2, $3)',
    values: [email, passwordHash, username],
  };
  const result = await pool.query(query);
  return result;
};

export const loginUser = async (username: string, password: string) => {
  const selectUser = {
    text: 'SELECT * FROM app_user WHERE username = $1',
    values: [username],
  };
  const selectedUserResult = await pool.query(selectUser);
  const { rows: selectedUserRows } = selectedUserResult;
  if (selectedUserRows.length !== 0) {
    const verified = await verifyPassword(password, selectedUserRows[0].password_hash);
    if (verified) {
      const loginUser = {
        text: 'UPDATE app_user SET loggedin = true WHERE id = $1',
        values: [selectedUserRows[0].id],
      };
      await pool.query(loginUser);
      return selectedUserRows[0];
    }
  }
  return null;
};

export const logoutUser = async (id: number) => {
  const loginUser = {
    text: 'UPDATE app_user SET loggedin = false WHERE id = $1',
    values: [id],
  };
  const loggedInResult = await pool.query(loginUser);
  return loggedInResult;
};

export const userFromUsername = async (username: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE username = $1',
    values: [username],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const userFromEmail = async (email: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE email = $1',
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const generatePasswordHash = async (plaintextPassword: string) => {
  const saltRounds = 10;
  return bcrypt.hash(plaintextPassword, saltRounds);
};

export const verifyPassword = (plaintextPassword: string, passwordHash: string) => {
  return bcrypt.compare(plaintextPassword, passwordHash);
};
