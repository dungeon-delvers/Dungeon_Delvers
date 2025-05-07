import { Vector3 } from '@babylonjs/core';
import { Action, ActionResult, FAILED, NOT_DONE, SUCCEEDED } from './action';
import { Actor } from './actor';
import { Player } from './player';

const player = new Player({
  id: 0,
  name: 'Ricard',
  level: 1,
  attributes: {
    CON: 14,
    DEX: 16,
    INT: 9,
    MIG: 11,
    PER: 15,
    RES: 10,
  },
  gender: 'MALE',
  race: 'HUMAN',
  playerClass: 'FIGHTER',
  isAlive: true,
  position: new Vector3(0, 0, 0), // Example argument for rotation
  rotation: new Vector3(0, 0, 0), // Example argument for position
  visibility: 'PUBLIC',
  userId: 1,
  zoneId: 1,
});

const bat = new Actor({
  id: 0,
  name: 'A bat',
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
  type: 'BEAST', // Example argument for type
  zoneId: 1,
});

const idle = new Action({
  actor: player,
  target: bat,
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
