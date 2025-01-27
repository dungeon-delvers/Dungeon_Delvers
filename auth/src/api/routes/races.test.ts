import express from 'express';
import request from 'supertest';

import { getRaces } from '@/services/races';

import charactersRoute from './races';

const authHandler = jest.fn((req, _res, next) => {
  req.user = { id: 'test-user' }; // Mock authenticated user
  next();
});

jest.mock('@/services/races');
jest.mock('passport', () => ({
  authenticate: jest.fn(() => authHandler),
}));

const app = express();
app.use(express.json());
const router = express.Router();
charactersRoute(router);
app.use(router);

describe('GET /races', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should return 200 and a list of races when authenticated', async () => {
    const mockRaces = [
      { id: 1, name: 'Elf' },
      { id: 2, name: 'Dwarf' },
    ];
    (getRaces as jest.Mock).mockResolvedValue(mockRaces);

    const response = await request(app).get('/races');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ races: mockRaces });
  });

  it('should return 401 when not authenticated', async () => {
    authHandler.mockImplementation((_req, _res, next) => {
      next();
    });

    const response = await request(app).get('/races');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });
});
