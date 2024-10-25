import { pool } from '../services/database/postgres'
import { userFromUsername } from './user'

// auth/src/models/user.test.ts

jest.mock('../services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}))

describe('userFromEmail', () => {
  it('should return user data when user is found', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      password_hash: 'hashedpassword',
    }
    ;(pool.query as jest.Mock).mockResolvedValue({ rows: [mockUser] })

    const result = await userFromUsername('testuser')
    expect(result).toEqual(mockUser)
    expect(pool.query).toHaveBeenCalledWith({
      text: 'SELECT * FROM app_user WHERE username = $1',
      values: ['testuser'],
    })
  })

  it('should return undefined when no user is found', async () => {
    ;(pool.query as jest.Mock).mockResolvedValue({ rows: [] })

    const result = await userFromUsername('nonexistentuser')
    expect(result).toBeUndefined()
    expect(pool.query).toHaveBeenCalledWith({
      text: 'SELECT * FROM app_user WHERE username = $1',
      values: ['nonexistentuser'],
    })
  })
})
