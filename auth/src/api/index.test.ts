import { Router } from 'express';

import createRouter from './index';
import auth from './routes/auth';

jest.mock('express', () => ({
  Router: jest.fn(),
}));

jest.mock('./routes/auth');

describe('createRouter', () => {
  it('should create a router and configure auth routes', () => {
    const mockRouter = {
      use: jest.fn(),
    };
    (Router as jest.Mock).mockReturnValue(mockRouter);

    const router = createRouter();

    expect(Router).toHaveBeenCalled();
    expect(auth).toHaveBeenCalledWith(mockRouter);
    expect(router).toBe(mockRouter);
  });
});
