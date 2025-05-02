import { ActorType, BaseStats, DefenseStats, MonsterType } from 'types/game';

import { Attributes } from './attribute';
import { Vector3 } from '@babylonjs/core';

const MOD_ACCURACY = 0.01;
const MOD_ACTION_SPEED = 0.03;
const MOD_AREA_OF_EFFECT = 0.06;
const MOD_CONCENTRATION = 0.03;
const MOD_DAMAGE = 0.03;
const MOD_DEFLECTION = 0.01;
const MOD_DURATION = 0.05;
const MOD_FORTITUDE = 0.02;
const MOD_HEALING = 0.03;
const MOD_HEALTH = 0.05;
const MOD_REFLEX = 0.02;
const MOD_WILLPOWER = 0.02;

export class Actor implements ActorType {
  #id: string;
  #attributes: Attributes;
  #name: string;
  #position: Vector3;
  #rotation: Vector3;
  #zoneId: string;
  // Action stats are calculated based on actor's action/weapon
  #actionStats: {
    accuracy: number;
    actionSpeed: number;
    areaOfEffect: number;
    damageMod: number;
    duration: number;
    healing: number;
  };

  // Defense stats are calculated based on actor's level and class
  #defenseStats: {
    deflection: number;
    fortitude: number;
    reflex: number;
    willpower: number;
  };
  // Passive stats are calculated based on actor's level and class
  #passiveStats: {
    concentration: number;
    currentHealth: number;
    maxHealth: number;
  };

  constructor(
    id: string,
    name: string,
    attributes: Attributes,
    baseStats: BaseStats,
    position: Vector3,
    rotation: Vector3,
    _type: MonsterType
  ) {
    this.#id = id;
    this.#name = name;
    this.#attributes = attributes;
    this.#actionStats = {
      accuracy: this.calculateStat(
        baseStats.accuracy,
        this.#attributes.getAttribute('PER').calculateModifier(MOD_ACCURACY)
      ),
      actionSpeed: Math.ceil(
        this.#attributes.getAttribute('DEX').calculateModifier(MOD_ACTION_SPEED)
      ),
      areaOfEffect: Math.ceil(
        this.#attributes
          .getAttribute('INT')
          .calculateModifier(MOD_AREA_OF_EFFECT)
      ),
      damageMod: this.#attributes
        .getAttribute('MIG')
        .calculateModifier(MOD_DAMAGE),
      duration: Math.ceil(
        this.#attributes.getAttribute('INT').calculateModifier(MOD_DURATION)
      ),
      healing: Math.ceil(
        this.#attributes.getAttribute('MIG').calculateModifier(MOD_HEALING)
      ),
    };
    this.#defenseStats = {
      deflection: this.calculateStat(
        baseStats.deflection,
        this.#attributes.getAttribute('RES').calculateModifier(MOD_DEFLECTION)
      ),
      fortitude: this.calculateStat(
        baseStats.fortitude,
        this.#attributes.getAttribute('CON').calculateModifier(MOD_FORTITUDE) +
          this.#attributes.getAttribute('MIG').calculateModifier(MOD_FORTITUDE)
      ),
      reflex: this.calculateStat(
        baseStats.reflex,
        this.#attributes.getAttribute('DEX').calculateModifier(MOD_REFLEX) +
          this.#attributes.getAttribute('PER').calculateModifier(MOD_REFLEX)
      ),
      willpower: this.calculateStat(
        baseStats.willpower,
        this.#attributes.getAttribute('INT').calculateModifier(MOD_WILLPOWER) +
          this.#attributes.getAttribute('RES').calculateModifier(MOD_WILLPOWER)
      ),
    };
    const maxHealth = this.calculateStat(
      baseStats.health,
      this.#attributes.getAttribute('CON').calculateModifier(MOD_HEALTH)
    );
    this.#passiveStats = {
      concentration: Math.ceil(
        this.#attributes
          .getAttribute('RES')
          .calculateModifier(MOD_CONCENTRATION) + 0
      ),
      maxHealth: maxHealth,
      currentHealth: maxHealth,
    };
    this.#position = position;
    this.#rotation = rotation;
  }

  get health() {
    return this.#passiveStats.currentHealth;
  }

  set health(value: number) {
    this.#passiveStats.currentHealth = value;
  }

  get id() {
    return this.#id;
  }

  set id(inId: string) {
    this.#id = inId;
  }

  get isAlive() {
    return this.#passiveStats.currentHealth > 0;
  }

  get maxHealth() {
    return this.#passiveStats.maxHealth;
  }

  set maxHealth(value: number) {
    this.#passiveStats.maxHealth = value;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  set position(value: Vector3) {
    this.#position = value;
  }

  get rotation() {
    return this.#rotation;
  }
  set rotation(value: Vector3) {
    this.#rotation = value;
  }

  get stats() {
    return {
      ...this.#actionStats,
      ...this.#defenseStats,
      ...this.#passiveStats,
    };
  }

  get zoneId() {
    return this.#zoneId;
  }

  set zoneId(value: string) {
    this.#zoneId = value;
  }

  attackResolution = (target: ActorType, defenseStat: keyof DefenseStats) => {
    const hitChance =
      Math.floor(Math.random() * 100) +
      Math.floor(this.stats.accuracy - target.stats[defenseStat]);
    if (hitChance >= 101) {
      return 'CRITICAL';
    } else if (hitChance >= 50) {
      return 'HIT';
    } else if (hitChance >= 16) {
      return 'GRAZE';
    } else {
      return 'MISS';
    }
  };

  calculateDamage = (
    target: ActorType,
    defenseStat: keyof DefenseStats,
    minDamage: number,
    maxDamage: number
  ) => {
    const attackResult = this.attackResolution(target, defenseStat);
    const damage = () =>
      Math.floor(
        (Math.random() * (maxDamage - minDamage + 1) + minDamage) *
          (1 + this.stats.damageMod)
      );
    switch (attackResult) {
      case 'CRITICAL':
        return Math.floor(damage() * 1.5);
      case 'HIT':
        return damage();
      case 'GRAZE':
        return Math.floor(damage() * 0.5);
      case 'MISS':
        return 'MISS';
    }
  };

  calculateStat(base: number, modifiers: number) {
    return Math.ceil(base * 1 + modifiers);
  }
}
