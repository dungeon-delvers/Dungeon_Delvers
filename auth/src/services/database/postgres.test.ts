import { Pool } from 'pg';
import '../../config';
import { pool } from './postgres';

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(() => {
      return {
        query: jest.fn(),
        release: jest.fn(),
      };
    }),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Postgres Pool', () => {
  it('should create a new pool with the correct configuration', () => {
    const { DB_USER, DB_HOST = 'localhost', DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

    expect(Pool).toHaveBeenCalledWith({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
    });
  });

  it('should connect to the database', async () => {
    const client = await pool.connect();
    expect(client).toBeDefined();
  });

  it('should execute a query', async () => {
    const query = 'SELECT NOW()';
    const result = { rows: [{ now: new Date() }] };
    (pool.query as jest.Mock).mockResolvedValueOnce(result);

    const res = await pool.query(query);
    expect(res).toEqual(result);
    expect(pool.query).toHaveBeenCalledWith(query);
  });

  it('should close the pool', async () => {
    await pool.end();
    expect(pool.end).toHaveBeenCalled();
  });
});
