import { Race, Races, RaceName } from './race';

describe('Race', () => {
  it('should construct and expose properties', () => {
    const race = new Race({
      name: 'HUMAN',
      description: 'A test human',
      constitution: 10,
      dexterity: 11,
      intellect: 12,
      might: 13,
      perception: 14,
      resolve: 15,
    });
    expect(race.name).toBe('HUMAN');
    expect(race.description).toBe('A test human');
    expect(race.attributes).toEqual({
      constitution: 10,
      dexterity: 11,
      intellect: 12,
      might: 13,
      perception: 14,
      resolve: 15,
    });
  });

  it('Races.DWARF should be a Race with correct stats', () => {
    const dwarf = Races.DWARF;
    expect(dwarf).toBeInstanceOf(Race);
    expect(dwarf.name).toBe('DWARF');
    expect(typeof dwarf.description).toBe('string');
    expect(dwarf.attributes.constitution).toBeGreaterThan(0);
  });

  it('Races.HUMAN should be a Race with correct stats', () => {
    const human = Races.HUMAN;
    expect(human).toBeInstanceOf(Race);
    expect(human.name).toBe('HUMAN');
    expect(typeof human.description).toBe('string');
    expect(human.attributes.constitution).toBeGreaterThan(0);
  });

  it('Races.ORC should be a Race with correct stats', () => {
    const orc = Races.ORC;
    expect(orc).toBeInstanceOf(Race);
    expect(orc.name).toBe('ORC');
    expect(typeof orc.description).toBe('string');
    expect(orc.attributes.might).toBeGreaterThan(0);
  });

  it('Races.GOBLIN should be a Race with correct stats', () => {
    const goblin = Races.GOBLIN;
    expect(goblin).toBeInstanceOf(Race);
    expect(goblin.name).toBe('GOBLIN');
    expect(typeof goblin.description).toBe('string');
    expect(goblin.attributes.dexterity).toBeGreaterThan(0);
  });
});
