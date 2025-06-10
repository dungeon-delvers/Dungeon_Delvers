import { Buff, CharacterProps } from '@shared/types/character';

import { Character } from './character';

describe('Character', () => {
  let props: CharacterProps;
  beforeEach(() => {
    props = {
      baseAccuracy: 5,
      constitution: 10,
      currentHealth: 80,
      deflection: 12,
      dexterity: 8,
      drArcane: 1,
      drCold: 2,
      drCorrosion: 3,
      drCrush: 4,
      drFire: 5,
      drPierce: 6,
      drPoison: 7,
      drShock: 8,
      drSlash: 9,
      fortitude: 13,
      gender: 'MALE',
      id: 1,
      intellect: 7,
      level: 2,
      maxHealth: 100,
      might: 6,
      name: 'TestHero',
      perception: 9,
      reflex: 14,
      resolve: 5,
      resourceMax: 30,
      resourceName: 'MANA',
      resourceValue: 30,
      willpower: 15,
      zoneId: 1,
    };
  });

  it('should construct and expose basic properties', () => {
    const c = new Character(props);
    expect(c.name).toBe('TestHero');
    expect(c.might).toBe(6);
    expect(c.health).toBe(80);
    expect(c.resourceName).toBe('MANA');
    expect(c.resourceMax).toBe(30);
    expect(c.resourceValue).toBe(30);
  });

  it('should set and get defense values', () => {
    const c = new Character(props);
    c.defense = { deflection: 20, fortitude: 21, reflex: 22, willpower: 23 };
    expect(c.getDefense('deflection')).toBe(20);
    expect(c.getDefense('fortitude')).toBe(21);
    expect(c.getDefense('reflex')).toBe(22);
    expect(c.getDefense('willpower')).toBe(23);
  });

  it('should take damage and not go below 0', () => {
    const c = new Character(props);
    c.takeDamage(30);
    expect(c.health).toBe(50);
    c.takeDamage(100);
    expect(c.health).toBe(0);
  });

  it('should not set health above maxHealth', () => {
    const c = new Character(props);
    c.health = 200;
    expect(c.health).toBe(100);
  });

  it('should not set resourceValue above max', () => {
    const c = new Character(props);
    c.resourceValue = 100;
    expect(c.resourceValue).toBe(30);
  });

  it('should calculate accuracy correctly', () => {
    const c = new Character(props);
    expect(typeof c.accuracy).toBe('number');
  });

  it('should set accuracy', () => {
    const c = new Character(props);
    c.accuracy = 42;
    expect(c.accuracy).toBeGreaterThanOrEqual(42);
  });

  it('should add and return active buffs', () => {
    jest.useFakeTimers();
    const c = new Character(props);
    const buff: Buff = {
      buffAmount: 5,
      buffStat: 'deflection',
      duration: 1000,
      id: 1,
      name: 'TestBuff',
    };
    c.activeBuffs = buff;
    const buffs = c.activeBuffs;
    expect(buffs[1]).toBeDefined();
    expect(buffs[1].name).toBe('TestBuff');
    // Simulate time passing
    jest.advanceTimersByTime(1001);
    expect(Object.keys(c.activeBuffs).length).toBe(0);
    jest.useRealTimers();
  });
});
