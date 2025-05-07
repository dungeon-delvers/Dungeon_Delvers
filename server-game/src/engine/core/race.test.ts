import { Race } from './race';
import { Attributes } from './attribute';

describe('Race', () => {
  it('should correctly initialize with name, attributes, and description', () => {
    const mockName = 'DWARF';
    const mockAttributes = new Attributes({
      CON: 14,
      DEX: 8,
      INT: 10,
      MIG: 16,
      PER: 12,
      RES: 8,
    });
    const mockDescription =
      'An ancient race of stout and hardy folk, known for their resilience and craftsmanship.';

    const race = new Race(mockName, mockAttributes, mockDescription);

    expect(race.name).toBe(mockName);
    expect(race.attributes).toEqual(mockAttributes);
    expect(race.description).toBe(mockDescription);
  });
});
