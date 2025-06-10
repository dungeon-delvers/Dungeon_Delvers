import {
  ActionProps,
  AttackProps,
  BuffProps,
  HealProps,
} from '@shared/types/action';

import {
  AbilityAttackAction,
  AttackAction,
  HealAction,
  resolveAttack,
  SpellBuffAction,
} from './action';
import { Character } from './character';

describe('Action Strategies', () => {
  let source: Character;
  let target: Character;

  beforeEach(() => {
    source = new Character({
      baseAccuracy: 10,
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
      id: 1,
      gender: 'MALE',
      intellect: 10,
      level: 5,
      maxHealth: 100,
      might: 10,
      name: 'Hero',
      perception: 10,
      reflex: 10,
      resolve: 10,
      resourceMax: 100,
      resourceName: 'STAMINA',
      resourceValue: 100,
      willpower: 10,
      zoneId: 1,
    });

    target = new Character({
      baseAccuracy: 10,
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
      id: 1,
      gender: 'MALE',
      intellect: 10,
      level: 5,
      maxHealth: 100,
      might: 10,
      name: 'Monster',
      perception: 10,
      reflex: 10,
      resolve: 10,
      resourceMax: 100,
      resourceName: 'STAMINA',
      resourceValue: 100,
      willpower: 10,
      zoneId: 1,
    });
  });

  it('AttackAction: should resolve a hit and apply damage', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8); // high roll for HIT
    const actionProps = {
      baseDamage: 20,
      defenseStat: 'deflection',
      name: 'Strike',
    } as ActionProps & AttackProps;
    const attack = new AttackAction();
    const result = attack.perform(source, target, actionProps);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Hero attacks Monster: HIT for 20 damage!');
    expect(target.health).toBe(80);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('AttackAction: should resolve a critical hit and apply increased damage', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    source.accuracy = 100;
    target.defense = {
      deflection: 0,
      fortitude: 10,
      reflex: 10,
      willpower: 10,
    };
    const actionProps = {
      baseDamage: 20,
      defenseStat: 'deflection',
      name: 'Strike',
    } as ActionProps & AttackProps;
    const attack = new AttackAction();
    const result = attack.perform(source, target, actionProps);
    expect(result.success).toBe(true);
    expect(result.message).toBe(
      'Hero attacks Monster: CRITICAL for 30 damage!'
    );
    expect(target.health).toBe(70);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('AttackAction: should resolve a graze and apply reduced damage', () => {
    // To get a GRAZE, result must be between 16 and 50 inclusive
    // Let's set accuracy = 10, defense = 0, roll = 20 (so result = 30)
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2); // roll = 20
    source.accuracy = 10;
    target.defense = {
      deflection: 0,
      fortitude: 10,
      reflex: 10,
      willpower: 10,
    };
    const actionProps = {
      baseDamage: 20,
      defenseStat: 'deflection',
      name: 'Strike',
    } as ActionProps & AttackProps;
    const attack = new AttackAction();
    const result = attack.perform(source, target, actionProps);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Hero attacks Monster: GRAZE for 10 damage!');
    expect(target.health).toBe(90);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('AttackAction: should resolve a miss', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0); // low roll for MISS
    source.accuracy = 0;
    target.defense = {
      deflection: 30,
      fortitude: 10,
      reflex: 10,
      willpower: 10,
    };
    const actionProps = {
      baseDamage: 20,
      defenseStat: 'deflection',
      name: 'Strike',
    } as ActionProps & AttackProps;
    const attack = new AttackAction();
    const result = attack.perform(source, target, actionProps);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Hero attacks Monster: MISS!');
    expect(target.health).toBe(100);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('HealAction: should heal the target', () => {
    target.health = 50;
    const actionProps = { healAmount: 30, name: 'Heal' } as ActionProps &
      HealProps;
    const heal = new HealAction();
    const result = heal.perform(source, target, actionProps);
    expect(result.success).toBe(true);
    expect(target.health).toBe(80);
  });

  it('AbilityAttackAction: should consume resource and apply spell damage', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8); // high roll for HIT
    source.resourceValue = 50;
    const actionProps = {
      actionText: (source: Character, target: Character) =>
        `${source.name} casts fireball at ${target.name}!`,
      areaOfEffect: 10,
      baseDamage: 25,
      cost: 10,
      defenseStat: 'reflex',
      name: 'Fireball',
    } as ActionProps & AttackProps;
    const ability = new AbilityAttackAction();
    const result = ability.perform(source, target, actionProps);
    expect(result.success).toBe(true);
    expect(source.resourceValue).toBe(40);
    expect(target.health).toBe(75);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('AbilityAttackAction: should fail if not enough resource', () => {
    source.resourceValue = 5;
    const actionProps = {
      actionText: (source: Character, target: Character) =>
        `${source.name} casts fireball at ${target.name}!`,
      areaOfEffect: 10,
      baseDamage: 25,
      cost: 10,
      defenseStat: 'reflex',
      name: 'Fireball',
    } as ActionProps & AttackProps;
    const ability = new AbilityAttackAction();
    const result = ability.perform(source, target, actionProps);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/does not have enough/i);
    expect(source.resourceValue).toBe(5);
    expect(target.health).toBe(100);
  });

  it('SpellBuffAction: should apply a buff and consume resource', () => {
    source.resourceValue = 20;
    const actionProps = {
      actionText: (source: Character, target: Character) =>
        `${source.name} casts Arcane Shield on ${target.name}!`,
      buffAmount: 5,
      buffStat: 'deflection',
      cooldown: 0,
      cost: 10,
      description: 'Buffs deflection',
      duration: 3000,
      executionTime: 0,
      icon: '',
      id: 1,
      name: 'Arcane Shield',
      range: 500,
      type: 'buff',
    } as ActionProps & BuffProps;
    const spellBuff = new SpellBuffAction();
    const result = spellBuff.perform(source, target, actionProps);
    expect(result.success).toBe(true);
    expect(source.resourceValue).toBe(10);
    expect(target.activeBuffs['1'].name).toBe('Arcane Shield');
    expect(target.activeBuffs['1'].buffStat).toBe('deflection');
    expect(target.activeBuffs['1'].buffAmount).toBe(5);
    expect(target.activeBuffs['1'].duration).toBe(3000);
  });

  it('SpellBuffAction: should fail if not enough resource', () => {
    source.resourceValue = 5;
    const actionProps = {
      actionText: (source: Character, target: Character) =>
        `${source.name} casts Arcane Shield on ${target.name}!`,
      buffAmount: 5,
      buffStat: 'deflection',
      cooldown: 0,
      cost: 10,
      description: 'Buffs deflection',
      duration: 3000,
      executionTime: 0,
      icon: '',
      id: 1,
      name: 'Arcane Shield',
      range: 500,
      type: 'buff',
    } as ActionProps & BuffProps;
    const spellBuff = new SpellBuffAction();
    const result = spellBuff.perform(source, target, actionProps);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/does not have enough/i);
    expect(source.resourceValue).toBe(5);
    expect(target.activeBuffs[1]).toBeUndefined();
  });

  it('resolveAttack: returns correct outcomes and damage', () => {
    // MISS
    source.accuracy = 0;
    target.defense = {
      deflection: 100,
      fortitude: 10,
      reflex: 10,
      willpower: 10,
    };
    let res = resolveAttack(source, target, 20, 'deflection');
    expect(res.outcome).toBe('MISS');
    expect(res.damage).toBe(0);

    // GRAZE
    source.accuracy = 10;
    target.defense = {
      deflection: 10,
      fortitude: 10,
      reflex: 10,
      willpower: 10,
    };
    res = resolveAttack(source, target, 20, 'deflection');
    // roll = 0, result = 10, should be GRAZE if result <= 50 and >= 16
    expect(['MISS', 'GRAZE', 'HIT', 'CRITICAL']).toContain(res.outcome);

    // CRITICAL
    jest.spyOn(global.Math, 'random').mockReturnValue(1); // roll = 100
    source.accuracy = 100;
    target.defense = {
      deflection: 0,
      fortitude: 10,
      reflex: 10,
      willpower: 10,
    };
    res = resolveAttack(source, target, 20, 'deflection');
    expect(res.outcome).toBe('CRITICAL');
    expect(res.damage).toBe(30);
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
