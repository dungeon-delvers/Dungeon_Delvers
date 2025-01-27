import { ATTRIBUTE, PlayerCharacterCreation } from '@dungeon-delvers/types';

import { pool } from '@/services/database/postgres';

import { createPlayerCharacter, getPlayerCharactersByUserID } from './playerCharacter';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('PlayerCharacter Queries', () => {
  describe('createPlayerCharacter', () => {
    it('should create a player character and return the result', async () => {
      const mockPlayerCharacter: PlayerCharacterCreation = {
        user_id: 1,
        name: 'Test Character',
        race: 'HUMAN',
        gender: 'MALE',
        class: 'FIGHTER',
        CON: 10,
        DEX: 10,
        INT: 10,
        MIG: 10,
        PER: 10,
        RES: 10,
      };

      const mockQueryResult = { rows: [mockPlayerCharacter] };
      (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

      const result = await createPlayerCharacter(1, mockPlayerCharacter);

      expect(pool.query).toHaveBeenCalledWith({
        text: `
    INSERT INTO player_character (
    user_id,
    name, level, race, gender, class, "${ATTRIBUTE.CON}", "${ATTRIBUTE.DEX}", "${ATTRIBUTE.INT}", "${ATTRIBUTE.MIG}", "${ATTRIBUTE.PER}", "${ATTRIBUTE.RES}", current_health)
    VALUES ($1, 1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        values: [
          1,
          mockPlayerCharacter.name,
          mockPlayerCharacter.race,
          mockPlayerCharacter.gender,
          mockPlayerCharacter.class,
          mockPlayerCharacter[ATTRIBUTE.CON],
          mockPlayerCharacter[ATTRIBUTE.DEX],
          mockPlayerCharacter[ATTRIBUTE.INT],
          mockPlayerCharacter[ATTRIBUTE.MIG],
          mockPlayerCharacter[ATTRIBUTE.PER],
          mockPlayerCharacter[ATTRIBUTE.RES],
        ],
      });
      expect(result).toEqual(mockPlayerCharacter);
    });
  });

  describe('getPlayerCharactersByUserID', () => {
    it('should return player characters for a given user ID', async () => {
      const mockPlayerCharacters: PlayerCharacterCreation[] = [
        {
          user_id: 1,
          name: 'Test Character 1',
          race: 'HUMAN',
          gender: 'MALE',
          class: 'FIGHTER',
          CON: 10,
          DEX: 10,
          INT: 10,
          MIG: 10,
          PER: 10,
          RES: 10,
        },
        {
          user_id: 1,
          name: 'Test Character 2',
          race: 'HUMAN',
          gender: 'MALE',
          class: 'FIGHTER',
          CON: 10,
          DEX: 10,
          INT: 10,
          MIG: 10,
          PER: 10,
          RES: 10,
        },
      ];

      const mockQueryResult = { rows: mockPlayerCharacters };
      (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

      const result = await getPlayerCharactersByUserID(1);

      expect(pool.query).toHaveBeenCalledWith({
        text: 'SELECT * FROM player_character WHERE user_id = $1',
        values: [1],
      });
      expect(result).toEqual(mockPlayerCharacters);
    });
  });
});
