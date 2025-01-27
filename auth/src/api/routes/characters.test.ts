import express from 'express';
import request from 'supertest';

import { createCharacter, getCharacters } from '@/services/playerCharacter';

import charactersRoute from './characters';

const authHandler = jest.fn((req, _res, next) => {
  req.user = { id: 'test-user' }; // Mock authenticated user
  next();
});

jest.mock('@/services/playerCharacter');
jest.mock('passport', () => ({
  authenticate: jest.fn(() => authHandler),
}));

const app = express();
app.use(express.json());
const router = express.Router();
charactersRoute(router);
app.use(router);

describe('GET /characters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return characters for authenticated user', async () => {
    (getCharacters as jest.Mock).mockResolvedValue([{ name: 'Aragorn' }, { name: 'Legolas' }]);

    const response = await request(app).get('/characters').set('Authorization', 'Bearer test-token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ characters: [{ name: 'Aragorn' }, { name: 'Legolas' }] });
  });

  it('should return 401 for unauthenticated user', async () => {
    authHandler.mockImplementation((_req, _res, next) => {
      next();
    });

    const response = await request(app).get('/characters');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });
});

describe('POST /character/create', () => {
  it('should create a character for authenticated user', async () => {
    authHandler.mockImplementation((req, _res, next) => {
      req.user = { id: 'test-user' }; // Mock authenticated user
      next();
    });
    const newCharacter = { name: 'Gimli' };
    (createCharacter as jest.Mock).mockResolvedValue(newCharacter);

    const response = await request(app)
      .post('/character/create')
      .send(newCharacter)
      .set('Authorization', 'Bearer test-token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ character: newCharacter });
  });

  it('should return 401 for unauthenticated user', async () => {
    authHandler.mockImplementation((_req, _res, next) => {
      next();
    });

    const response = await request(app).post('/character/create').send({ name: 'Gimli' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });
});
