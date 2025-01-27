import express from 'express';
import request from 'supertest';

import expressLoader from '@/loaders/express';

describe('Express Loader', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    expressLoader(app);
  });

  it('should return 200 on /status', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
  });

  it('should enable trust proxy', () => {
    expect(app.get('trust proxy')).toBe(true);
  });

  it('should use JSON middleware', () => {
    const jsonMiddleware = app._router.stack.find((layer: any) => layer.name === 'jsonParser');
    expect(jsonMiddleware).toBeDefined();
  });

  it('should use CORS middleware', () => {
    const corsMiddleware = app._router.stack.find((layer: any) => layer.name === 'corsMiddleware');
    expect(corsMiddleware).toBeDefined();
  });

  it('should use session middleware', () => {
    const sessionMiddleware = app._router.stack.find((layer: any) => layer.name === 'session');
    expect(sessionMiddleware).toBeDefined();
  });
});
