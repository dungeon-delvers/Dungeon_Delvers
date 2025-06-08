import { errors } from 'celebrate';
import express from 'express';
import passport from 'passport';
import request from 'supertest';

import { generateToken, logout, signup } from '@/services/auth';

import authRoutes from './auth';
import { User } from '@shared/types/user';

jest.mock('@/services/auth');

jest.mock('passport');

const app = express();
app.use(express.json());
const router = express.Router();
authRoutes(router);
app.use(router);
app.use(errors());

describe('Auth Routes', () => {
  describe('POST /login', () => {
    it('should return 200 and token for valid credentials', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      const loginHandler = jest.fn(
        (
          _user: User,
          _options: passport.LogInOptions,
          done: (err: any) => void
        ) => {
          done(null);
        }
      );
      const mockToken = 'mockToken';
      (passport.authenticate as jest.Mock).mockImplementation(
        (_strategy, _options, callback) => (req, _res) => {
          req.login = loginHandler;
          callback(null, mockUser);
        }
      );
      (generateToken as jest.Mock).mockResolvedValue(mockToken);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe(mockToken);
    });

    it('should return 401 for invalid credentials', async () => {
      (passport.authenticate as jest.Mock).mockImplementation(
        (_strategy, _options, callback) => (_req, _res) => {
          callback(null, false);
        }
      );

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid username or password');
    });
    it('should handle errors when authenticating', async () => {
      const loginHandler = jest.fn(
        (
          _user: User,
          _options: passport.LogInOptions,
          _done: (err: any) => void
        ) => {
          _done(new Error('Authentication error'));
        }
      );
      (passport.authenticate as jest.Mock).mockImplementation(
        (_strategy, _options, callback) => (req, _res) => {
          req.login = loginHandler;
          callback(new Error('Authentication error'));
        }
      );

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(500);
    });
    it('should handle errors when logging in', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      const loginHandler = jest.fn(
        (
          _user: User,
          _options: passport.LogInOptions,
          _done: (err: any) => void
        ) => {
          _done(new Error('Login error'));
        }
      );
      const mockToken = 'mockToken';
      (passport.authenticate as jest.Mock).mockImplementation(
        (_strategy, _options, callback) => (req, _res) => {
          req.login = loginHandler;
          callback(null, mockUser);
        }
      );
      (generateToken as jest.Mock).mockResolvedValue(mockToken);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /logout', () => {
    it('should return 200 and message for valid logout', async () => {
      (logout as jest.Mock).mockResolvedValue(true);

      const response = await request(app).post('/logout').send({ id: 1 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User logged out');
    });

    it('should return 400 for missing id', async () => {
      const response = await request(app).post('/logout').send({});

      expect(response.status).toBe(400);
    });
    it('should handle errors when logging out', async () => {
      (logout as jest.Mock).mockRejectedValue(new Error('Logout error'));

      const response = await request(app).post('/logout').send({ id: 1 });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /signup', () => {
    it('should return 200 and token for valid signup', async () => {
      const mockToken = 'mockToken';
      (signup as jest.Mock).mockResolvedValue({ token: mockToken });

      const response = await request(app).post('/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        passwordRepeat: 'password',
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe(mockToken);
    });

    it('should return 400 for invalid signup data', async () => {
      const response = await request(app).post('/signup').send({
        email: 'invalid-email',
        username: 'testuser',
        password: 'password',
        passwordRepeat: 'password',
      });

      expect(response.status).toBe(400);
    });
    it('should return 500 if token could not be generated', async () => {
      (signup as jest.Mock).mockResolvedValue({ token: null });

      const response = await request(app).post('/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        passwordRepeat: 'password',
      });

      expect(response.status).toBe(500);
    });
    it('should return 500 for signup error', async () => {
      (signup as jest.Mock).mockRejectedValue(new Error('Signup error'));

      const response = await request(app).post('/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        passwordRepeat: 'password',
      });

      expect(response.status).toBe(500);
    });

    it('should throw a new error if error is not an instance of Error', async () => {
      (signup as jest.Mock).mockRejectedValue('Signup error');

      const response = await request(app).post('/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        passwordRepeat: 'password',
      });

      expect(response.status).toBe(500);
      expect(response.text).toContain(
        'Encountered unexpected error when trying to return error, might not have been an Error thrown.'
      );
    });
  });
});
