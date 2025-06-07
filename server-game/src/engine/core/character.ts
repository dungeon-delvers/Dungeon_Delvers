import {
  Constitution,
  Dexterity,
  Intellect,
  Might,
  Perception,
  Resolve,
} from './attribute';
import { DEFENSE_TYPES, DefenseStats, DefenseType } from './defense';

type Gender = 'MALE' | 'FEMALE' | 'NON-BINARY' | 'OTHER';

export type CharacterProps = DefenseStats & {
  baseAccuracy: number;
  constitution: number;
  currentHealth: number;
  dexterity: number;
  drArcane: number;
  drCold: number;
  drCorrosion: number;
  drCrush: number;
  drFire: number;
  drPierce: number;
  drPoison: number;
  drShock: number;
  drSlash: number;
  gender: Gender;
  intellect: number;
  level: number;
  maxHealth: number;
  might: number;
  name: string;
  perception: number;
  resourceName: 'MANA' | 'STAMINA' | 'FAITH' | 'OPPORTUNITY';
  resourceMax: number;
  resourceValue: number;
  resolve: number;
};

const BUFFABLE_STATS = [
  'deflection',
  'fortitude',
  'reflex',
  'willpower',
  'drArcane',
  'drCold',
  'drCorrosion',
  'drCrush',
  'drFire',
  'drPierce',
  'drPoison',
  'drShock',
  'drSlash',
  'constitution',
  'dexterity',
  'intellect',
  'might',
  'perception',
  'resolve',
  'maxHealth',
  'accuracy',
] as const;

export type BuffableStat = (typeof BUFFABLE_STATS)[number];

export type Buff = {
  buffAmount: number;
  duration: number;
  id: number;
  name: string;
  buffStat: BuffableStat;
};

export type AppliedBuff = Buff & {
  timeout: NodeJS.Timeout;
  appliedAt: number;
};

const MOD_LEVEL = 3;
const MOD_ACCURACY = 1;

export class Character {
  #props: CharacterProps;
  #attributes: {
    con: Constitution;
    dex: Dexterity;
    int: Intellect;
    mig: Might;
    per: Perception;
    res: Resolve;
  };
  #buffs: Record<number, AppliedBuff> = {};
  constructor(props: CharacterProps) {
    this.#props = props;
    this.#attributes = {
      con: new Constitution(props.constitution),
      dex: new Dexterity(props.dexterity),
      int: new Intellect(props.intellect),
      mig: new Might(props.might),
      per: new Perception(props.perception),
      res: new Resolve(props.resolve),
    };
  }

  get name(): string {
    return this.#props.name;
  }

  get might(): number {
    return this.#props.might;
  }

  public setDefense(value: { [key in DefenseType]: number }) {
    for (const type of DEFENSE_TYPES) {
      if (value[type] !== undefined) {
        this.#props[type] = value[type];
      }
    }
  }

  takeDamage(amount: number): void {
    this.#props.currentHealth -= amount;
    if (this.#props.currentHealth < 0) {
      this.#props.currentHealth = 0;
    }
  }

  getDefense(defenseType: DefenseType): number {
    return this.#props[defenseType];
  }

  get accuracy(): number {
    return (
      this.#props.baseAccuracy +
      (this.#props.level - 1) +
      this.#attributes.per.calculateModifier(MOD_ACCURACY)
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

  get maxHealth(): number {
    return this.#props.maxHealth;
  }

  get resourceName(): 'MANA' | 'STAMINA' | 'FAITH' | 'OPPORTUNITY' {
    return this.#props.resourceName;
  }

  get resourceValue(): number {
    return this.#props.resourceValue;
  }

  get resourceMax(): number {
    return this.#props.resourceMax;
  }

  set resourceValue(value: number) {
    this.#props.resourceValue = value;
    if (this.#props.resourceValue > this.#props.resourceMax) {
      this.#props.resourceValue = this.#props.resourceMax;
    }
  }
}
