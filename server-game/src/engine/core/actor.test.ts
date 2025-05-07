import { Vector3 } from '@babylonjs/core';
import { Actor } from './actor';

const actor = new Actor({
  id: 0,
  name: 'Ricard',
  attributes: {
    CON: 14,
    DEX: 16,
    INT: 9,
    MIG: 11,
    PER: 15,
    RES: 10,
  },
  baseStats: {
    accuracy: 46, // 47
    health: 117, // 118
    defense: {
      deflection: 37, // 37
      fortitude: 41, // 42
      reflex: 53, // 54
      willpower: 30, // 30
    },
  },
  isAlive: true,
  position: new Vector3(0, 0, 0), // Example argument for rotation
  rotation: new Vector3(0, 0, 0), // Example argument for position
  type: 'HUMANOID', // Example argument for type
  zoneId: 1,
});

afterEach(() => {
  jest.restoreAllMocks();
});
test('Actor constructor', () => {
  expect(actor.stats).toEqual({
    accuracy: 47,
    actionSpeed: 1,
    areaOfEffect: -0,
    concentration: 0,
    damageMod: 0.03,
    deflection: 37,
    duration: -0,
    fortitude: 42,
    healing: 1,
    currentHealth: 118,
    maxHealth: 118,
    reflex: 54,
    willpower: 30,
  });
});
test('Actor.attackResolution should return MISS if the hitChance is below 16', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.05);
  const result = actor.attackResolution(actor, 'deflection');
  expect(result).toEqual('MISS');
});

test('Actor.attackResolution should return GRAZE if the hitChance is above 16', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.15);
  const result = actor.attackResolution(actor, 'deflection');
  expect(result).toEqual('GRAZE');
});

test('Actor.attackResolution should return HIT if the hitChance is above 50', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  const result = actor.attackResolution(actor, 'deflection');
  expect(result).toEqual('HIT');
});

test('Actor.attackResolution should return CRITICAL if the hitChance is above 100', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.99);
  const result = actor.attackResolution(actor, 'deflection');
  expect(result).toEqual('CRITICAL');
});

test('Actor.calculateDamage should return no damage if the attack is a miss', () => {
  jest.spyOn(actor, 'attackResolution').mockReturnValue('MISS');
  const result = actor.calculateDamage(actor, 'deflection', 1, 2);
  expect(result).toEqual('MISS');
});

test('Actor.calculateDamage should return half damage if the attack is a graze', () => {
  jest.spyOn(actor, 'attackResolution').mockReturnValue('GRAZE');
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  const result = actor.calculateDamage(actor, 'deflection', 10, 15);
  expect(result).toEqual(6);
});

test('Actor.calculateDamage should return full damage if the attack is a hit', () => {
  jest.spyOn(actor, 'attackResolution').mockReturnValue('HIT');
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  const result = actor.calculateDamage(actor, 'deflection', 10, 15);
  expect(result).toEqual(13);
});

test('Actor.calculateDamage should return 1.5x damage if the attack is a critical', () => {
  jest.spyOn(actor, 'attackResolution').mockReturnValue('CRITICAL');
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  const result = actor.calculateDamage(actor, 'deflection', 10, 15);
  expect(result).toEqual(19);
});
