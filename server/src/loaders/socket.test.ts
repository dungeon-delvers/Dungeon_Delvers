import { Server } from 'socket.io';

import isAuth from '../api/middlewares/isAuth';
import socketLoader from './socket';

jest.mock('socket.io');
jest.mock('../api/middlewares/isAuth', () => jest.fn());

describe('socketLoader', () => {
  it('should apply middleware to the socket server', async () => {
    const mockUse = jest.fn();
    const mockApp = {
      use: mockUse,
    } as unknown as Server;

    await socketLoader(mockApp);

    expect(mockUse).toHaveBeenCalledWith(expect.any(Function));

    // Verify the middleware function
    const middleware = mockUse.mock.calls[0][0];
    const mockNext = jest.fn();
    middleware({}, mockNext);
    expect(isAuth).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
