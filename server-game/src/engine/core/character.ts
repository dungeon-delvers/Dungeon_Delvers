import { Vector3 } from '@babylonjs/core';
import {
  AppliedBuff,
  Buff,
  CharacterProps,
  Gender,
  ICharacter,
} from '@shared/types/character';

import { Resource } from '@shared/types/resource';

import { DEFENSE_TYPES, DefenseType } from '@shared/types/defense';
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

export class Character implements ICharacter {
  attributes: {
    constitution: Constitution;
    dexterity: Dexterity;
    intellect: Intellect;
    might: Might;
    perception: Perception;
    resolve: Resolve;
  };

  #buffs: Record<number, AppliedBuff> = {};

  location: Vector3 = new Vector3(0, 0, 0);

  props: CharacterProps;

  rotation: Vector3 = new Vector3(0, 0, 0);

  constructor(props: CharacterProps) {
    this.props = props;
    this.attributes = {
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
      this.props.baseAccuracy +
      (this.props.level - 1) +
      this.attributes.perception.calculateModifier(MOD_ACCURACY)
    );
  }

  set accuracy(value: number) {
    this.props.baseAccuracy = value;
  }

  applyBuff(buffId: number) {
    const now = Date.now();
    const activeBuffs: {
      [id: number]: AppliedBuff;
    } = {};
    for (const [id, buff] of Object.entries(this.#buffs)) {
      if (buff.appliedAt && now - buff.appliedAt < buff.duration) {
        activeBuffs[id] = buff;
      }
    }
  }

  removeBuffs(buff: Omit<Buff, 'appliedAt' | 'timeout'>) {
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

  set defense(value: { [key in DefenseType]: number }) {
    for (const type of DEFENSE_TYPES) {
      if (value[type] !== undefined) {
        this.props[type] = value[type];
      }
    }
  }

  get gender(): Gender {
    return this.props.gender;
  }

  get health(): number {
    return this.props.currentHealth;
  }

  set health(value: number) {
    this.props.currentHealth = value;
    if (this.props.currentHealth > this.props.maxHealth) {
      this.props.currentHealth = this.props.maxHealth;
    }
  }

  get level(): number {
    return this.props.level;
  }

  set level(value: number) {
    this.props.level = value;
    // Update attributes based on level if needed
    // For example, you might want to increase health or other stats
  }

  get maxHealth(): number {
    return this.props.maxHealth;
  }

  get might(): number {
    return this.props.might;
  }

  get name(): string {
    return this.props.name;
  }

  get resourceMax(): number {
    return this.props.resourceMax;
  }

  get resourceName(): Pick<Resource, 'name'>['name'] {
    return this.props.resourceName;
  }

  get resourceValue(): number {
    return this.props.resourceValue;
  }

  set resourceValue(value: number) {
    this.props.resourceValue = value;
    if (this.props.resourceValue > this.props.resourceMax) {
      this.props.resourceValue = this.props.resourceMax;
    }
  }

  get zoneId(): number {
    return this.props.zoneId;
  }

  set zoneId(value: number) {
    this.props.zoneId = value;
  }

  getDefense(defenseType: DefenseType): number {
    return this.props[defenseType];
  }

  takeDamage(amount: number): void {
    this.props.currentHealth -= amount;
    if (this.props.currentHealth < 0) {
      this.props.currentHealth = 0;
    }
  }
}
