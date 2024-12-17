import express from 'express';
import request from 'supertest';

import loaders from '@/loaders';
import * as userQueries from '@/queries/user';
import { generatePasswordHash, generateToken, signup } from '@/services/auth';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

jest.mock('@/services/auth', () => ({
  ...jest.requireActual('@/services/auth'),
  generateToken: jest.fn(),
  signup: jest.fn(),
}));

jest.mock('@/queries/user', () => ({
  createUserQuery: jest.fn(),
  userFromUsernameQuery: jest.fn(),
  loginUserQuery: jest.fn(),
  logoutUserQuery: jest.fn(),
}));

describe('Auth Routes', () => {
  let app: express.Application;
  beforeEach(() => {
    app = express();
    loaders(app);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /login', () => {
    it('should authenticate user', async () => {
      (userQueries.userFromUsernameQuery as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'testuser@example.com',
        password_hash: await generatePasswordHash('password'),
        username: 'testuser',
        role: 'USER',
        loggedin: true,
        currentCharacterId: null,
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
      });
      (generateToken as jest.Mock).mockResolvedValueOnce('token');
      const response = await request(app).post('/api/login').send({ username: 'testuser', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'token' });
    });

    it('should return validation error for invalid input', async () => {
      (userQueries.userFromUsernameQuery as jest.Mock).mockResolvedValueOnce(null);
      const response = await request(app).post('/api/login').send({ username: 'invalid-user', password: 'password' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid username or password' });
    });

    it('should handle errors during login', async () => {
      (userQueries.userFromUsernameQuery as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
      const response = await request(app).post('/api/login').send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /logout', () => {
    it('should logout user', async () => {
      (userQueries.logoutUserQuery as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'testuser@example.com',
        password_hash: await generatePasswordHash('password'),
        username: 'testuser',
        role: 'USER',
        loggedin: false,
        currentCharacterId: null,
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
      });
      const response = await request(app).post('/api/logout').send({ id: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User logged out' });
    });

    it('should return validation error for invalid input', async () => {
      const response = await request(app).post('/api/logout').send({ id: 'invalid-id' });

      expect(response.status).toBe(500);
    });

    it('should handle errors during logout', async () => {
      (userQueries.logoutUserQuery as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
      const response = await request(app).post('/api/logout').send({ id: 1 });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /signup', () => {
    it('should signup user', async () => {
      const user = {
        id: 1,
        email: 'testuser@example.com',
        password_hash: await generatePasswordHash('password'),
        username: 'testuser',
        role: 'USER',
        loggedin: false,
        currentCharacterId: null,
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
      };

      (userQueries.createUserQuery as jest.Mock).mockResolvedValueOnce(user);
      (signup as jest.Mock).mockResolvedValueOnce({ user, token: 'token' });

      const response = await request(app)
        .post('/api/signup')
        .send({ email: 'testuser@example.com', username: 'testuser', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'token' });
    });

    it('should return validation error for invalid input', async () => {
      const response = await request(app).post('/api/signup').send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(500);
    });

    it('should handle errors during signup', async () => {
      (userQueries.createUserQuery as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
      const response = await request(app).post('/api/signup').send({
        email: 'testuser@example.com',
        password: 'password',
        username: 'testuser',
      });

      expect(response.status).toBe(500);
    });
  });
});
