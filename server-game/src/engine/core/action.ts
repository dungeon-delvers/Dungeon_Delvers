import { Actor } from './actor';
import { Player } from './player';

export type ActionResultArgs = {
  succeeded: boolean;
  done: boolean;
  alternative?: Action;
};

export type ActionArgs = {
  actor: Actor | Player;
  cooldown?: number;
  cost?: number;
  description: string;
  name: string;
  onPerform: () => ActionResult;
  range?: number;
  target: Actor | Player | null;
};

export class ActionResult {
  private _succeeded: boolean;
  private _done: boolean;
  private _alternative?: Action;

  constructor({ succeeded, done, alternative }: ActionResultArgs) {
    this._succeeded = succeeded;
    this._done = done;
    this._alternative = alternative;
  }

  get succeeded() {
    return this._succeeded;
  }

  get done() {
    return this._done;
  }

  get alternative() {
    return this._alternative;
  }
}

export const SUCCEEDED = new ActionResult({
  done: true,
  succeeded: true,
});
export const FAILED = new ActionResult({
  done: true,
  succeeded: false,
});
export const NOT_DONE = (alternative: Action) =>
  new ActionResult({
    alternative,
    done: false,
    succeeded: false,
  });

export class Action {
  #actor: Actor | Player;
  #target: Actor | Player | null = null;
  #cooldown: number;
  #cost: number;
  #description: string;
  #name: string;
  #range: number;
  #onPerform: () => ActionResult;

  constructor({
    name,
    actor,
    target,
    description,
    cost = 0,
    cooldown = 0,
    range = 0,
    onPerform,
  }: ActionArgs) {
    this.#actor = actor;
    this.#target = target;
    this.#name = name;
    this.#description = description;
    this.#cost = cost;
    this.#cooldown = cooldown;
    this.#range = range;
    this.#onPerform = onPerform;
  }

  perform(): ActionResult {
    return this.#onPerform();
  }

  get target() {
    return this.#target;
  }

  set target(inTarget: Actor | null) {
    this.#target = inTarget;
  }

  get actor() {
    return this.#actor;
  }

  get cooldown() {
    return this.#cooldown;
  }

  get cost() {
    return this.#cost;
  }

  get description() {
    return this.#description;
  }

  get name() {
    return this.#name;
  }

  get range() {
    return this.#range;
  }
}
