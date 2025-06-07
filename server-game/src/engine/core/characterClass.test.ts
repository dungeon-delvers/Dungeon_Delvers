import {
  CharacterClass,
  CharacterClasses,
  ClassStatistics,
} from './characterClass';

describe('PlayerClass', () => {
  const stats: ClassStatistics = {
    baseAccuracy: 10,
    baseHealth: 20,
    deflection: 5,
    fortitude: 6,
    reflex: 7,
    willpower: 8,
    healthModifier: 2,
  };

  it('should construct and expose properties', () => {
    const pc = new CharacterClass({
      name: 'FIGHTER',
      description: 'A strong fighter',
      statistics: stats,
      resource: {
        name: 'STAMINA',
        baseValue: 30,
        valueModifier: 10,
      },
    });
    expect(pc.name).toBe('FIGHTER');
    expect(pc.description).toBe('A strong fighter');
    expect(pc.statistics).toEqual(stats);
  });

  it('PlayerClasses.FIGHTER should be a PlayerClass with correct stats', () => {
    const fighter = CharacterClasses.FIGHTER;
    expect(fighter).toBeInstanceOf(CharacterClass);
    expect(fighter.name).toBe('FIGHTER');
    expect(typeof fighter.description).toBe('string');
    expect(fighter.statistics.baseAccuracy).toBeGreaterThan(0);
  });

  it('PlayerClasses.MAGE should be a PlayerClass with correct stats', () => {
    const mage = CharacterClasses.MAGE;
    expect(mage).toBeInstanceOf(CharacterClass);
    expect(mage.name).toBe('MAGE');
    expect(typeof mage.description).toBe('string');
    expect(mage.statistics.baseHealth).toBeGreaterThan(0);
  });

  it('PlayerClasses.SCOUT should be a PlayerClass with correct stats', () => {
    const scout = CharacterClasses.SCOUT;
    expect(scout).toBeInstanceOf(CharacterClass);
    expect(scout.name).toBe('SCOUT');
    expect(typeof scout.description).toBe('string');
    expect(scout.statistics.baseAccuracy).toBeGreaterThan(0);
  });

  it('PlayerClasses.HEALER should be a PlayerClass with correct stats', () => {
    const healer = CharacterClasses.HEALER;
    expect(healer).toBeInstanceOf(CharacterClass);
    expect(healer.name).toBe('HEALER');
    expect(typeof healer.description).toBe('string');
    expect(healer.statistics.baseHealth).toBeGreaterThan(0);
  });
});
