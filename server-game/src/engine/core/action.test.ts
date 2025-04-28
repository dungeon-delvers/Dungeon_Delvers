import { Action, ActionResult, FAILED, NOT_DONE, SUCCEEDED } from './action';
import { Actor } from './actor';
import { Attributes } from './attribute';

const actor = new Actor(
  'hero',
  new Attributes({
    CON: 14,
    DEX: 16,
    INT: 9,
    MIG: 11,
    PER: 15,
    RES: 10,
  }),
  {
    accuracy: 46,
    deflection: 37,
    fortitude: 41,
    health: 117,
    reflex: 53,
    willpower: 30,
  },
  'HUMANOID'
);

const target = new Actor(
  'bat',
  new Attributes({
    CON: 10,
    DEX: 10,
    INT: 4,
    MIG: 10,
    PER: 15,
    RES: 10,
  }),
  {
    accuracy: 47,
    deflection: 37,
    fortitude: 42,
    health: 118,
    reflex: 54,
    willpower: 30,
  },
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
