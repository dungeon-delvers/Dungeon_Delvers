import { getRaces } from '@/queries/races';
import { pool } from '@/services/database/postgres';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('getRaces', () => {
  it('should return a list of races', async () => {
    const mockRaces = [
      { id: 1, name: 'Elf' },
      { id: 2, name: 'Dwarf' },
    ];
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockRaces });

    const races = await getRaces();

    expect(races).toEqual(mockRaces);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM race_data');
  });
});
