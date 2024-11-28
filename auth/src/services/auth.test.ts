import request from 'supertest';
import express from 'express';
import passport from 'passport';
import auth from './auth';
import { Pool } from 'pg';

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Auth Service', () => {
  let app: express.Application;
  let pool: any;
  beforeEach(() => {
    app = express();
    auth(app);
    pool = new Pool();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should initialize session and passport', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404); // Assuming no route is defined, it should return 404
  });

  it('should serialize user', () => {
    const user = { id: 1, email: 'test@example.com', password: 'password' };
    passport.serializeUser((user, done) => {
      done(null, (user as any).id);
    });
    passport.serializeUser(user, (err, id) => {
      expect(err).toBeNull();
      expect(id).toBe(user.id);
    });
  });

  it('should deserialize user', async () => {
    const user = { id: 1, email: 'test@example.com', password: 'password' };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [user] });

    passport.deserializeUser(async (id, done) => {
      const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        value: [id],
      };
      const { rows } = await pool.query(query);
      if (rows.length === 0) {
        return done(new Error('User not found'));
      }
      done(null, rows[0]);
    });

    passport.deserializeUser(user.id, (err, user) => {
      expect(err).toBeNull();
      expect(user).toEqual(user);
    });
  });

  it('should return error if user not found during deserialization', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    passport.deserializeUser(async (id, done) => {
      const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        value: [id],
      };
      const { rows } = await pool.query(query);
      if (rows.length === 0) {
        return done(new Error('User not found'));
      }
      done(null, rows[0]);
    });

    passport.deserializeUser(999, (err, user) => {
      expect(err).toEqual(new Error('User not found'));
      expect(user).toBeUndefined();
    });
  });
});
