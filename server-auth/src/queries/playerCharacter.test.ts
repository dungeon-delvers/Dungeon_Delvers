import { pool } from '@/services/database/postgres';

import {
  createPlayerCharacter,
  getPlayerCharactersByUserID,
  PlayerCharacter,
} from './playerCharacter';
import { Vector3 } from '@babylonjs/core';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('PlayerCharacter Queries', () => {
  describe('createPlayerCharacter', () => {
    it('should create a player character and return the result', async () => {
      const mockPlayerCharacter: PlayerCharacter = {
        userId: 0,
        name: 'Test Character',
        race: 'HUMAN',
        gender: 'MALE',
        class: 'FIGHTER',
        constitution: 10,
        dexterity: 10,
        intellect: 10,
        might: 10,
        perception: 10,
        resolve: 10,
        zoneId: 1,
      };

      const mockQueryResult = { rows: [mockPlayerCharacter] };
      (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

      const result = await createPlayerCharacter(1, mockPlayerCharacter);

      expect(pool.query).toHaveBeenCalledWith({
        text: `
    INSERT INTO player_character (
      user_id,
      name,
      race,
      gender,
      class,
      \"CON\",
      \"DEX\",
      \"INT\",
      \"MIG\",
      \"PER\",
      \"RES\"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        values: [
          1,
          mockPlayerCharacter.name,
          mockPlayerCharacter.race,
          mockPlayerCharacter.gender,
          mockPlayerCharacter.class,
          mockPlayerCharacter.constitution,
          mockPlayerCharacter.dexterity,
          mockPlayerCharacter.intellect,
          mockPlayerCharacter.might,
          mockPlayerCharacter.perception,
          mockPlayerCharacter.resolve,
        ],
      });
      expect(result).toEqual(mockPlayerCharacter);
    });
  });

  describe('getPlayerCharactersByUserID', () => {
    it('should return player characters for a given user ID', async () => {
      const mockPlayerCharacters: PlayerCharacter[] = [
        {
          userId: 0,
          name: 'Test Character 1',
          race: 'HUMAN',
          gender: 'MALE',
          playerClass: 'FIGHTER',
          attributes: {
            CON: 10,
            DEX: 10,
            INT: 10,
            MIG: 10,
            PER: 10,
            RES: 10,
          },
          isAlive: true,
          position: new Vector3(0, 0, 0),
          rotation: new Vector3(0, 0, 0),
          zoneId: 0,
          level: 1,
          visibility: 'PUBLIC',
        },
        {
          userId: 0,
          name: 'Test Character 2',
          race: 'HUMAN',
          gender: 'MALE',
          playerClass: 'FIGHTER',
          attributes: {
            CON: 10,
            DEX: 10,
            INT: 10,
            MIG: 10,
            PER: 10,
            RES: 10,
          },
          isAlive: true,
          position: new Vector3(0, 0, 0),
          rotation: new Vector3(0, 0, 0),
          zoneId: 0,
          level: 1,
          visibility: 'PUBLIC',
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
