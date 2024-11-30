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
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should create a new pool with the correct configuration', () => {
    expect(Pool).toHaveBeenCalledWith({
      user: 'test_user',
      host: 'test-host',
      database: 'test-db',
      password: 'test-password',
      port: 5454,
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
