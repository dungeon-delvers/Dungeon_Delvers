import express from 'express';
import request from 'supertest';

import loaders from '@/loaders';

describe('Health Route', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    loaders(app);
  });

  it('should return status UP', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'UP' });
  });
});
