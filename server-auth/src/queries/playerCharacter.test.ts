import { pool } from '@/services/database/postgres';

import {
  createPlayerCharacter,
  getPlayerCharactersByUserID,
} from './playerCharacter';
import { Vector3 } from '@babylonjs/core';
import {
  PlayerCharacterCreationProps,
  PlayerCharacterQueryResult,
} from '@shared/types/playerCharacter';

jest.mock('@/services/database/postgres', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('PlayerCharacter Queries', () => {
  describe('createPlayerCharacter', () => {
    it('should create a player character and return the result', async () => {
      const mockPlayerCharacter: PlayerCharacterCreationProps = {
        userId: 0,
        name: 'Test Character',
        race: 'HUMAN',
        gender: 'MALE',
        playerClass: 'FIGHTER',
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
      player_class,
      constitution,
      dexterity,
      intellect,
      might,
      perception,
      resolve,
      zone_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        values: [
          1,
          mockPlayerCharacter.name,
          mockPlayerCharacter.race,
          mockPlayerCharacter.gender,
          mockPlayerCharacter.playerClass,
          mockPlayerCharacter.constitution,
          mockPlayerCharacter.dexterity,
          mockPlayerCharacter.intellect,
          mockPlayerCharacter.might,
          mockPlayerCharacter.perception,
          mockPlayerCharacter.resolve,
          mockPlayerCharacter.zoneId,
        ],
      });
      expect(result).toEqual(mockPlayerCharacter);
    });
  });

  describe('getPlayerCharactersByUserID', () => {
    it('should return player characters for a given user ID', async () => {
      const mockPlayerCharacters: PlayerCharacterQueryResult[] = [
        {
          id: 1,
          user_id: 1,
          logged_in: false,
          name: 'Test Character 1',
          surname: null,
          race: 'HUMAN',
          gender: 'MALE',
          player_class: 'FIGHTER',
          constitution: 10,
          dexterity: 10,
          intellect: 10,
          might: 10,
          perception: 10,
          resolve: 10,
          current_health: 100,
          max_health: 100,
          visibility: 'PUBLIC',
          level: 1,
          zone_id: 0,
          location_x: 0,
          location_y: 0,
          location_z: 0,
          rotation_x: 0,
          rotation_y: 0,
          rotation_z: 0,
        },
        {
          id: 2,
          user_id: 2,
          logged_in: false,
          name: 'Test Character 2',
          surname: null,
          race: 'HUMAN',
          gender: 'MALE',
          player_class: 'FIGHTER',
          constitution: 10,
          dexterity: 10,
          intellect: 10,
          might: 10,
          perception: 10,
          resolve: 10,
          current_health: 100,
          max_health: 100,
          visibility: 'PUBLIC',
          level: 1,
          zone_id: 0,
          location_x: 1,
          location_y: 0,
          location_z: 0,
          rotation_x: 0,
          rotation_y: 0,
          rotation_z: 0,
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
