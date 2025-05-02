import { Vector3 } from '@babylonjs/core';
import { Action, ActionResult, FAILED, NOT_DONE, SUCCEEDED } from './action';
import { Actor } from './actor';
import { Attributes } from './attribute';

const actor = new Actor(
  'test',
  'Ricard',
  new Attributes({
    CON: 14,
    DEX: 16,
    INT: 9,
    MIG: 11,
    PER: 15,
    RES: 10,
  }),
  {
    accuracy: 46, // 47
    deflection: 37, // 37
    fortitude: 41, // 42
    health: 117, // 118
    reflex: 53, // 54
    willpower: 30, // 30
    actionSpeed: 1,
    areaOfEffect: 0,
    damageMod: 0.03,
    duration: 0,
    healing: 1,
  },

  new Vector3(0, 0, 0), // Example argument for rotation
  new Vector3(0, 0, 0), // Example argument for position
  'HUMANOID' // Example argument for type
);

const target = new Actor(
  'bat',
  'Bat',
  new Attributes({
    CON: 10,
    DEX: 10,
    INT: 4,
    MIG: 10,
    PER: 15,
    RES: 10,
  }),
  {
    accuracy: 46, // 47
    deflection: 37, // 37
    fortitude: 41, // 42
    health: 117, // 118
    reflex: 53, // 54
    willpower: 30, // 30
    actionSpeed: 1,
    areaOfEffect: 0,
    damageMod: 0.03,
    duration: 0,
    healing: 1,
  },
  new Vector3(1, 0, 0), // Example argument for rotation
  new Vector3(1, 1, 0), // Example argument for position
  'BEAST'
);

const idle = new Action({
  actor,
  target: actor,
  name: 'idle',
  description: 'Do nothing',
  onPerform: () => SUCCEEDED,
});

describe('ActionResult', () => {
  it('should create an instance', () => {
    expect(
      new ActionResult({
        alternative: idle,
        done: true,
        succeeded: true,
      })
    ).toBeTruthy();
  });
});

describe('SUCCEEDED', () => {
  it('should create a new ActionResult that has succeeded and is done', () => {
    expect(SUCCEEDED).toEqual(
      new ActionResult({
        done: true,
        succeeded: true,
      })
    );
  });
});

describe('FAILED', () => {
  it('should create a new ActionResult that has not succeeded and is done', () => {
    expect(FAILED).toEqual(
      new ActionResult({
        done: true,
        succeeded: false,
      })
    );
  });
});

describe('NOT_DONE', () => {
  it('should create a new ActionResult that has not succeeded, is not done, and has an alternative action to perform', () => {
    expect(NOT_DONE(idle)).toEqual(
      new ActionResult({
        alternative: idle,
        done: false,
        succeeded: false,
      })
    );
  });
});
