import { PlayerCharacter, PlayerCharacterProps } from './playerCharacter';
import { CharacterClasses } from './characterClass';

describe('PlayerCharacter', () => {
  const baseProps = {
    className: 'FIGHTER',
    constitution: 10,
    currentHealth: 100,
    deflection: 10,
    dexterity: 10,
    drArcane: 0,
    drCold: 0,
    drCorrosion: 0,
    drCrush: 0,
    drFire: 0,
    drPierce: 0,
    drPoison: 0,
    drShock: 0,
    drSlash: 0,
    fortitude: 10,
    gender: 'MALE',
    intellect: 10,
    level: 1,
    maxHealth: 100,
    might: 10,
    name: 'TestPlayer',
    perception: 10,
    raceName: 'HUMAN',
    reflex: 10,
    resolve: 10,
    resourceMax: 30,
    resourceValue: 30,
    willpower: 10,
  };

  it('should construct and expose className', () => {
    const pc = new PlayerCharacter(baseProps as PlayerCharacterProps);
    expect(pc.className).toBe('FIGHTER');
  });

  it('should inherit statistics from CharacterClass', () => {
    const pc = new PlayerCharacter(baseProps as PlayerCharacterProps);
    const fighterStats = CharacterClasses.FIGHTER.statistics;
    expect(pc.health).toBe(baseProps.currentHealth);
    expect(pc.getDefense('deflection')).toBe(fighterStats.deflection);
    expect(pc.getDefense('fortitude')).toBe(fighterStats.fortitude);
    expect(pc.getDefense('reflex')).toBe(fighterStats.reflex);
    expect(pc.getDefense('willpower')).toBe(fighterStats.willpower);
  });

  it('should set and get health', () => {
    const pc = new PlayerCharacter(baseProps as PlayerCharacterProps);
    pc.health = 50;
    expect(pc.health).toBe(50);
    pc.health = 200;
    expect(pc.health).toBe(pc.maxHealth);
  });

  it('should set and get resourceValue', () => {
    const pc = new PlayerCharacter(baseProps as PlayerCharacterProps);
    pc.resourceValue = 5;
    expect(pc.resourceValue).toBe(5);
    pc.resourceValue = 100;
    expect(pc.resourceValue).toBe(pc.resourceMax);
  });
});
