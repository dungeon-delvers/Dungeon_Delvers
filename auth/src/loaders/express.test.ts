import cors from 'cors';
import config from '../config';
import routes from '../api';
import auth from '../services/auth';
import loader from './express';

const express = jest.fn(() => ({
  get: jest.fn(),
  head: jest.fn(),
  enable: jest.fn(),
  use: jest.fn(),
  json: jest.fn(),
}));

jest.mock('cors', () => jest.fn());
jest.mock('../config', () => ({
  api: {
    prefix: '/api',
  },
}));
jest.mock('../api', () => jest.fn());
jest.mock('../services/auth', () => jest.fn());

describe('Express Loader', () => {
  let app: any;

  beforeEach(() => {
    app = express();
    jest.mock('express', () => {
      express;
    });
  });

  it('should set up status routes', () => {
    loader(app);
    app.get('/status', expect.any(Function));
    expect(app.get).toHaveBeenCalledWith('/status', expect.any(Function));
    expect(app.head).toHaveBeenCalledWith('/status', expect.any(Function));
  });

  it('should return 200 on a get /status', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    loader(app);
    const callback = app.get.mock.calls[0][1];
    callback({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
  });

  it('should return 200 on a head /status', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    loader(app);
    const callback = app.head.mock.calls[0][1];
    callback({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
  });

  it('should enable trust proxy', () => {
    loader(app);
    expect(app.enable).toHaveBeenCalledWith('trust proxy');
  });

  it('should use cors middleware', () => {
    loader(app);
    expect(app.use).toHaveBeenCalledWith(cors());
  });

  it('should use express.json middleware', () => {
    loader(app);
    expect(app.use).toHaveBeenCalledWith(app.json());
  });

  it('should call auth service', () => {
    loader(app);
    expect(auth).toHaveBeenCalledWith(app);
  });

  it('should use routes with api prefix', () => {
    loader(app);
    expect(app.use).toHaveBeenCalledWith(config.api.prefix, routes());
  });
});
