import { getRaces } from '@/queries/races';
import { pool } from '@/services/database/postgres';
import { RaceQueryResult } from '@shared/types/race';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('getRaces', () => {
  it('should return a list of races', async () => {
    const mockRaces: RaceQueryResult[] = [
      {
        id: 1,
        name: 'DWARF',
        constitution: 10,
        dexterity: 8,
        intellect: 7,
        might: 9,
        perception: 6,
        resolve: 5,
        description: 'Sturdy and resilient',
      },
      {
        id: 2,
        name: 'HUMAN',
        constitution: 8,
        dexterity: 10,
        intellect: 9,
        might: 7,
        perception: 6,
        resolve: 8,
        description: 'Versatile and adaptable',
      },
      {
        id: 3,
        name: 'ORC',
        constitution: 12,
        dexterity: 6,
        intellect: 5,
        might: 11,
        perception: 7,
        resolve: 9,
        description: 'Strong and fierce',
      },
      {
        id: 4,
        name: 'GOBLIN',
        constitution: 6,
        dexterity: 12,
        intellect: 8,
        might: 5,
        perception: 10,
        resolve: 7,
        description: 'Cunning and agile',
      },
    ];
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockRaces });

    const races = await getRaces();

    expect(races).toEqual(mockRaces);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM race_data');
  });
});
