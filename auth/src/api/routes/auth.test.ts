import express from 'express';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { pool } from '../../services/database/postgres';
import authRoutes from './auth';

jest.mock('../../services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const userModel = {
  createUser: jest.fn(),
  generatePasswordHash: jest.fn(),
  userFromUsername: jest.fn(),
  userFromEmail: jest.fn(),
  loginUser: jest.fn(),
  verifyPassword: jest.fn(),
};
const validateUser = jest.fn();

describe('Auth Routes', () => {
  let app: express.Application;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    const { default: loaders } = await import('../../loaders');
    loaders(app);
    const router = express.Router();
    authRoutes(router);
    app.use(router);
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
    it('should authenticate user and return 201 status', async () => {
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          {
            id: 1,
            username: 'loginuser',
            password_hash: await bcrypt.hash('password', 10),
            email: 'loginuser@example.com',
          },
        ],
      });
      const response = await request(app).post('/login').send({ username: 'testuser', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
      expect(response.body.result.id).toStrictEqual(1);
      expect(response.body.result.username).toStrictEqual('loginuser');
      expect(response.body.result.email).toStrictEqual('loginuser@example.com');
    });
  });

  describe('POST /signup', () => {
    it('should create a new user and return 201 status', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        rows: [],
        fields: [],
      });
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const response = await request(app).post('/signup').send({
        email: 'registeruserpasses@example.com',
        username: 'registeruserpasses',
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
        .send({ email: 'registeruserfails', username: '', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"email" must be a valid email');
    });

    it('should return 400 status if user creation fails', async () => {
      validateUser.mockReturnValue({ error: null });
      userModel.generatePasswordHash.mockResolvedValue('hashedpassword');
      userModel.createUser.mockResolvedValue(false);

      const response = await request(app).post('/signup').send({
        email: 'resigeruserfails@example.com',
        username: 'registeruserfails',
        password: 'password',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"passwordRepeat" is required');
    });
  });
});
