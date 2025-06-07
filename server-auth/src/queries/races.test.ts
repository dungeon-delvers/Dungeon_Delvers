import { getRaces, RaceData } from '@/queries/races';
import { pool } from '@/services/database/postgres';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('getRaces', () => {
  it('should return a list of races', async () => {
    const mockRaces: RaceData[] = [
      {
        id: 1,
        name: 'DWARF',
        base_constitution: 10,
        base_dexterity: 8,
        base_intellect: 7,
        base_might: 9,
        base_perception: 6,
        base_resolve: 5,
        description: 'Sturdy and resilient',
      },
      {
        id: 2,
        name: 'HUMAN',
        base_constitution: 8,
        base_dexterity: 10,
        base_intellect: 9,
        base_might: 7,
        base_perception: 6,
        base_resolve: 8,
        description: 'Versatile and adaptable',
      },
      {
        id: 3,
        name: 'ORC',
        base_constitution: 12,
        base_dexterity: 6,
        base_intellect: 5,
        base_might: 11,
        base_perception: 7,
        base_resolve: 9,
        description: 'Strong and fierce',
      },
      {
        id: 4,
        name: 'GOBLIN',
        base_constitution: 6,
        base_dexterity: 12,
        base_intellect: 8,
        base_might: 5,
        base_perception: 10,
        base_resolve: 7,
        description: 'Cunning and agile',
      },
    ];
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockRaces });

    const races = await getRaces();

    expect(races).toEqual(mockRaces);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM race_data');
  });
});
