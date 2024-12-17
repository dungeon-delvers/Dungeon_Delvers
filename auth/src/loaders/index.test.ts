import { Express } from 'express';

import expressLoader from './express';
import loader from './index';

jest.mock('./express');
jest.mock('./passport');
jest.mock('./logger');

describe('Loader', () => {
  let app: Express;

  beforeEach(() => {
    app = {} as Express;
  });

  it('should call expressLoader with expressApp', async () => {
    await loader(app);
    expect(expressLoader).toHaveBeenCalledWith(app);
  });

  it('should call passportLoader with expressApp', async () => {
    await loader(app);
    expect(expressLoader).toHaveBeenCalledWith(app);
  });
});
