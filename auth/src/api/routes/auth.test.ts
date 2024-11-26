import express from 'express';
import request from 'supertest';
import authRoutes from './auth';
import { pool } from '../../services/database/postgres';
import { generatePasswordHash } from '../../models/user';

// jest.mock('pg', () => {
//   const mPool = {
//     connect: jest.fn(),
//     query: jest.fn(),
//     end: jest.fn(),
//   };
//   return { Pool: jest.fn(() => mPool) };
// });

const userModel = {
  createUser: jest.fn(),
  generatePasswordHash: jest.fn(),
  userFromUsername: jest.fn(),
};
const validateUser = jest.fn();

describe('Auth Routes', () => {
  let pool: any;
  let app: express.Application;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    const { default: loaders } = await import('../../loaders');
    loaders(app);
    const router = express.Router();
    authRoutes(router);
    app.use(router);
  });

  beforeEach(() => {
    jest.mock('../../models/user', () => ({
      userModel,
    }));
    jest.mock('../../models/validation', () => ({
      validateUser: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /login', () => {
    it.only('should authenticate user and return 201 status', async () => {
      pool.query = jest.fn().mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            username: 'testuser',
            password_hash: generatePasswordHash('password'),
            email: 'testuser@example.com',
          },
        ],
      });
      userModel.userFromUsername.mockResolvedValue({
        id: 1,
        username: 'testuser',
      });
      const response = await request(app).post('/login').send({ username: 'testuser', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
      });
    });
  });

  describe('POST /signup', () => {
    it('should create a new user and return 201 status', async () => {
      pool.query.mockResolvedValueOnce({
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        rows: [],
        fields: [],
      });
      validateUser.mockReturnValue({ error: null });
      userModel.generatePasswordHash.mockResolvedValue('hashedpassword');
      userModel.createUser.mockResolvedValue(true);

      const response = await request(app).post('/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        passwordRepeat: 'password',
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created');
    });

    it('should return 400 status for invalid user data', async () => {
      validateUser.mockReturnValue({ error: { message: 'Invalid data' } });

      const response = await request(app)
        .post('/signup')
        .send({ email: 'invalidemail', username: '', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"email" must be a valid email');
    });

    it('should return 400 status if user creation fails', async () => {
      validateUser.mockReturnValue({ error: null });
      userModel.generatePasswordHash.mockResolvedValue('hashedpassword');
      userModel.createUser.mockResolvedValue(false);

      const response = await request(app).post('/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"passwordRepeat" is required');
    });
  });
});
