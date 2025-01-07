import { Router, Request, Response } from 'express';

export default (app: Router) => {
  app.get('/health', async (_req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
  });
};
