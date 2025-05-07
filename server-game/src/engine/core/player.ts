import {
  PlayerClassName,
  Visibility,
  PlayerCharacter,
  Race,
  Gender,
  PlayerCharacterCreation,
} from 'types/game';
import { Actor } from './actor';
import { Vector3 } from '@babylonjs/core';
import { getCharacterByID } from '@/queries/characters';
import { PlayerClasses } from './playerClass';
export class Player extends Actor implements PlayerCharacter {
  #gender: Gender;
  #level: number = 1;
  #playerClass: PlayerClassName;
  #race: Race;
  #surname?: string;
  #userId: number;
  #visibility: Visibility;

  constructor({
    id,
    name,
    attributes,
    gender,
    level,
    playerClass,
    position,
    race,
    rotation,
    userId,
  }: PlayerCharacterCreation) {
    const baseStats = {
      accuracy: PlayerClasses[playerClass].calculateAccuracy(level),
      defense: PlayerClasses[playerClass].defense,
      health: PlayerClasses[playerClass].calculateHealth(level),
    };
    super({
      id,
      name,
      attributes,
      baseStats,
      position,
      rotation,
      type: 'HUMANOID',
      isAlive: true,
      zoneId: 0,
    });
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

  set visibility(inVisibility: Visibility) {
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

  set playerClass(inPlayerClass: PlayerClassName) {
    this.#playerClass = inPlayerClass;
  }

  toString() {
    return `${this.name} (${this.#playerClass})`;
  }
}

export const getPlayerById = async (playerID: number): Promise<Player> => {
  const result = await getCharacterByID(playerID);
  return new Player(result);
};
