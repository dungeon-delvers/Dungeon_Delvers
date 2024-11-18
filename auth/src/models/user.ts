import { query } from 'express'
import { pool } from '../services/database/postgres'
import bcrypt from 'bcrypt'

export const createUser = async (
  email: string,
  passwordHash: string,
  username: string,
) => {
  const query = {
    text: 'INSERT INTO app_user (email, password_hash, username) VALUES ($1, $2, $3)',
    values: [email, passwordHash, username],
  }
  return await pool.query(query)
}

export const loginUser = async (username: string, password: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE username = $1',
    values: [username],
  }
  const { rows } = await pool.query(query)
  if (rows.length !== 0) {
    const verified = await verifyPassword(password, rows[0].password_hash)
    if (verified) {
      return rows[0]
    }
  }
  return null

}

export const userFromUsername = async (username: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE username = $1',
    values: [username],
  }
  const { rows } = await pool.query(query)
  return rows[0]
}

export const userFromEmail = async (email: string) => {
  const query = {
    text: 'SELECT * FROM app_user WHERE email = $1',
    values: [email],
  }
  const { rows } = await pool.query(query)
  return rows[0]
}

export const generatePasswordHash = async (plaintextPassword: string) => {
  const saltRounds = 10
  return bcrypt.hash(plaintextPassword, saltRounds)
}

export const verifyPassword = (
  plaintextPassword: string,
  passwordHash: string,
) => {
  return bcrypt.compare(plaintextPassword, passwordHash)
}
