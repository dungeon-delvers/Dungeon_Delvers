import { Race } from './race';
import { Race as RaceName } from '@dungeon-delvers/types';
import { Attributes } from './attribute';

describe('Race', () => {
  it('should correctly initialize with name, attributes, and description', () => {
    const mockName: RaceName = 'DWARF';
    const mockAttributes = new Attributes({
      CON: 14,
      DEX: 8,
      INT: 10,
      MIG: 16,
      PER: 12,
      RES: 8,
    });
    const mockDescription =
      'A mystical race with high dexterity and intelligence.';

    const race = new Race(mockName, mockAttributes, mockDescription);

    expect(race.name).toBe(mockName);
    expect(race.attributes).toEqual(mockAttributes);
    expect(race.description).toBe(mockDescription);
  });
});
