import {
  BaseStats,
  PlayerClass,
  Visiblity,
  PlayerCharacter,
  Race,
  Gender,
} from 'types/game';
import { Attributes } from './attribute';
import { Actor } from './actor';
import { Vector3 } from '@babylonjs/core';
export class Player extends Actor implements PlayerCharacter {
  #gender: Gender;
  #level: number = 1;
  #playerClass: PlayerClass;
  #race: Race;
  #surname?: string;
  #userId: string;
  #visibility: Visiblity;

  constructor(
    id: string,
    name: string,
    attributes: Attributes,
    baseStats: BaseStats,
    gender: Gender,
    playerClass: PlayerClass,
    position: Vector3,
    race: Race,
    rotation: Vector3,
    userId: string
  ) {
    super(id, name, attributes, baseStats, position, rotation, 'HUMANOID');
    this.#playerClass = playerClass;
    this.#visibility = 'PUBLIC';
    this.#userId = userId;
    this.#race = race;
    this.#gender = gender;
  }

  get surname(): string | undefined {
    return this.#surname;
  }

  set surname(surname: string | undefined) {
    this.#surname = surname;
  }

  get gender(): Gender {
    return this.#gender;
  }

  set gender(gender: Gender) {
    this.#gender = gender;
  }

  get level(): number {
    return this.#level;
  }

  set level(level: number) {
    this.#level = level;
  }

  get visibility() {
    return this.#visibility;
  }

  set visibility(inVisibility: Visiblity) {
    this.#visibility = inVisibility;
  }

  get userId() {
    return this.#userId;
  }

  get race() {
    return this.#race;
  }

  set race(inRace: Race) {
    this.#race = inRace;
  }

  get playerClass() {
    return this.#playerClass;
  }

  set playerClass(inPlayerClass: PlayerClass) {
    this.#playerClass = inPlayerClass;
  }

  toString() {
    return `${this.name} (${this.#playerClass})`;
  }
}
