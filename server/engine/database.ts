import { Client } from 'pg'

const {
  DB_USER,
  DB_HOST = 'localhost',
  DB_PASSWORD,
  DB_DATABASE_NAME,
  DB_PORT,
} = process.env

export const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
})
