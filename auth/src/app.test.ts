import config from './config';

describe('startServer', () => {
  let app: any;
  let loaders: jest.Mock;
  let express: jest.Mock;
  let info: jest.Mock;
  beforeEach(async () => {
    jest.resetModules();
    jest.restoreAllMocks();
    jest.mock('./config', () => ({
      ...config,
      port: 4001,
    }));
    app = {
      listen: jest.fn((port, callback) => {
        callback();
      }),
      use: jest.fn(),
    };
    express = jest.fn(() => app);
    loaders = jest.fn();
    jest.mock('express', () => express);
    jest.mock('./loaders', () => loaders);
    info = jest.fn();
    jest.mock('./loaders/logger', () => ({
      info,
    }));
    // Doing this in the test, caused it to expect statements to fail
    await import('./app');
  });
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  it('should start the server and log the correct message', async () => {
    expect(express).toHaveBeenCalled();
    expect(loaders).toHaveBeenCalled();
    expect(app.listen).toHaveBeenCalledWith(4001, expect.any(Function));
    expect(info).toHaveBeenCalledWith(expect.stringContaining('Auth Server listening on port: 4001'));
  });
});
