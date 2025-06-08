import { Vector3 } from '@babylonjs/core';
import {
  AppliedBuff,
  Buff,
  CharacterProps,
  Gender,
} from '@shared/types/character';

import { DEFENSE_TYPES, DefenseType } from '../../../../shared/types/defense';
import {
  Constitution,
  Dexterity,
  Intellect,
  Might,
  Perception,
  Resolve,
} from './attribute';

// const MOD_LEVEL = 3;
const MOD_ACCURACY = 1;

export class Character {
  #attributes: {
    constitution: Constitution;
    dexterity: Dexterity;
    intellect: Intellect;
    might: Might;
    perception: Perception;
    resolve: Resolve;
  };

  #buffs: Record<number, AppliedBuff> = {};

  #location: Vector3 = new Vector3(0, 0, 0);

  #props: CharacterProps;

  #rotation: Vector3 = new Vector3(0, 0, 0);

  constructor(props: CharacterProps) {
    this.#props = props;
    this.#attributes = {
      constitution: new Constitution(props.constitution),
      dexterity: new Dexterity(props.dexterity),
      intellect: new Intellect(props.intellect),
      might: new Might(props.might),
      perception: new Perception(props.perception),
      resolve: new Resolve(props.resolve),
    };
  }

  get accuracy(): number {
    return (
      this.#props.baseAccuracy +
      (this.#props.level - 1) +
      this.#attributes.perception.calculateModifier(MOD_ACCURACY)
    );
  }

  set accuracy(value: number) {
    this.#props.baseAccuracy = value;
  }

  get activeBuffs(): {
    [id: string]: AppliedBuff;
  } {
    const now = Date.now();
    const activeBuffs: {
      [id: number]: AppliedBuff;
    } = {};
    for (const [id, buff] of Object.entries(this.#buffs)) {
      if (buff.appliedAt && now - buff.appliedAt < buff.duration) {
        activeBuffs[id] = buff;
      }
    }
    return activeBuffs;
  }

  set activeBuffs(buff: Omit<Buff, 'appliedAt' | 'timeout'>) {
    this.#buffs[buff.id] = {
      ...buff,
      appliedAt: Date.now(),
      timeout: (() => {
        return setTimeout(() => {
          delete this.#buffs[buff.id];
        }, buff.duration);
      })(),
    };
  }

  get attributes(): {
    constitution: number;
    dexterity: number;
    intellect: number;
    might: number;
    perception: number;
    resolve: number;
  } {
    return {
      constitution: this.#props.constitution,
      dexterity: this.#props.dexterity,
      intellect: this.#props.intellect,
      might: this.#props.might,
      perception: this.#props.perception,
      resolve: this.#props.resolve,
    };
  }

  set defense(value: { [key in DefenseType]: number }) {
    for (const type of DEFENSE_TYPES) {
      if (value[type] !== undefined) {
        this.#props[type] = value[type];
      }
    }
  }

  get gender(): Gender {
    return this.#props.gender;
  }

  get health(): number {
    return this.#props.currentHealth;
  }

  set health(value: number) {
    this.#props.currentHealth = value;
    if (this.#props.currentHealth > this.#props.maxHealth) {
      this.#props.currentHealth = this.#props.maxHealth;
    }
  }

  get level(): number {
    return this.#props.level;
  }

  set level(value: number) {
    this.#props.level = value;
    // Update attributes based on level if needed
    // For example, you might want to increase health or other stats
  }

  get location(): Vector3 {
    return this.#location;
  }

  set location(value: Vector3) {
    this.#location = value;
  }

  get maxHealth(): number {
    return this.#props.maxHealth;
  }

  get might(): number {
    return this.#props.might;
  }

  get name(): string {
    return this.#props.name;
  }

  get resourceMax(): number {
    return this.#props.resourceMax;
  }

  get resourceName(): 'FAITH' | 'MANA' | 'OPPORTUNITY' | 'STAMINA' {
    return this.#props.resourceName;
  }

  get resourceValue(): number {
    return this.#props.resourceValue;
  }

  set resourceValue(value: number) {
    this.#props.resourceValue = value;
    if (this.#props.resourceValue > this.#props.resourceMax) {
      this.#props.resourceValue = this.#props.resourceMax;
    }
  }

  get rotation(): Vector3 {
    return this.#rotation;
  }

  set rotation(value: Vector3) {
    this.#rotation = value;
  }

  get zoneId(): number {
    return this.#props.zoneId;
  }

  set zoneId(value: number) {
    this.#props.zoneId = value;
  }

  getDefense(defenseType: DefenseType): number {
    return this.#props[defenseType];
  }

  takeDamage(amount: number): void {
    this.#props.currentHealth -= amount;
    if (this.#props.currentHealth < 0) {
      this.#props.currentHealth = 0;
    }
  }
}
