import bcrypt from 'bcrypt';

import Logger from '@/loaders/logger';
import { loginUserQuery, userFromUsernameQuery } from '@/queries/user';

import { login } from './auth';

jest.mock('bcrypt');
jest.mock('@/queries/user');
jest.mock('@/loaders/logger');

describe('login', () => {
  const mockDone = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if the user is not found', async () => {
    (userFromUsernameQuery as jest.Mock).mockResolvedValue(null);

    await login('testuser', 'password', mockDone);

    expect(userFromUsernameQuery).toHaveBeenCalledWith('testuser');
    expect(Logger.info).toHaveBeenCalledWith('User not found');
    expect(mockDone).toHaveBeenCalledWith(null, false, { message: 'User not found' });
  });

  it('should return an error if the password is incorrect', async () => {
    const mockUser = { id: 1, username: 'testuser', password_hash: 'hashedpassword' };
    (userFromUsernameQuery as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await login('testuser', 'password', mockDone);

    expect(userFromUsernameQuery).toHaveBeenCalledWith('testuser');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
    expect(Logger.info).toHaveBeenCalledWith('Incorrect password');
    expect(mockDone).toHaveBeenCalledWith(null, false, { message: 'Incorrect password' });
  });

  it('should return the user if the password is correct', async () => {
    const mockUser = { id: 1, username: 'testuser', password_hash: 'hashedpassword' };
    (userFromUsernameQuery as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await login('testuser', 'password', mockDone);

    expect(userFromUsernameQuery).toHaveBeenCalledWith('testuser');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
    expect(loginUserQuery).toHaveBeenCalledWith(mockUser.id);
    expect(Logger.info).toHaveBeenCalledWith('User verified');
    expect(mockDone).toHaveBeenCalledWith(null, mockUser);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Test error');
    (userFromUsernameQuery as jest.Mock).mockRejectedValue(mockError);

    await login('testuser', 'password', mockDone);

    expect(userFromUsernameQuery).toHaveBeenCalledWith('testuser');
    expect(Logger.error).toHaveBeenCalledWith(mockError);
    expect(mockDone).toHaveBeenCalledWith(mockError);
  });
});
