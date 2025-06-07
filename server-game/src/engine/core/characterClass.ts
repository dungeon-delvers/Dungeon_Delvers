import { DefenseStats } from './defense';

export const CHARACTER_CLASS_NAMES = [
  'FIGHTER',
  'MAGE',
  'SCOUT',
  'HEALER',
] as const;

export type CharacterClassName = (typeof CHARACTER_CLASS_NAMES)[number];

type ClassResource = {
  name: 'MANA' | 'STAMINA' | 'FAITH' | 'OPPORTUNITY';
  baseValue: number;
  valueModifier: number;
};

export type ClassStatistics = DefenseStats & {
  baseAccuracy: number;
  baseHealth: number;
  healthModifier: number;
};

export type ICharacterClass = {
  description: string;
  name: CharacterClassName;
  statistics: ClassStatistics;
  resource: ClassResource;
};

export class CharacterClass implements ICharacterClass {
  #statistics: ClassStatistics;
  #description: string;
  #name: CharacterClassName;
  #resource: ClassResource;
  constructor({
    name,
    description,
    statistics,
    resource,
  }: Omit<ICharacterClass, 'calculateAccuracy' | 'calculateHealth'>) {
    this.#name = name;
    this.#description = description;
    this.#statistics = statistics;
    this.#resource = resource;
  }
  get description() {
    return this.#description;
  }
  get name() {
    return this.#name;
  }

  get statistics() {
    return this.#statistics;
  }
  get resource() {
    return this.#resource;
  }
}

/** See about moving these values to the Database for easier modifications */
export const CharacterClasses = {
  FIGHTER: new CharacterClass({
    name: 'FIGHTER',
    description: `The Fighter stands as the unwavering bulwark on the battlefield. Tempered by rigorous training and clad in formidable armor, they are masters of close-quarters combat. Wielding a variety of weapons with brutal efficiency, they excel at both dealing significant damage and weathering the fiercest assaults, making them the linchpin of any successful party.`,
    statistics: {
      baseAccuracy: 30,
      baseHealth: 42,
      deflection: 25,
      fortitude: 20,
      reflex: 20,
      willpower: 15,
      healthModifier: 14,
    },
    resource: {
      name: 'STAMINA',
      baseValue: 30,
      valueModifier: 10,
    },
  }),
  MAGE: new CharacterClass({
    name: 'MAGE',
    description: `The Mage commands the raw power of the elements and the intricate energies of the arcane. Through years of study and focused will, they can conjure devastating spells, from searing flames and crackling lightning to freezing blizzards and mystical projectiles. Their command over these potent forces makes them a formidable source of ranged damage and control on the battlefield.`,
    statistics: {
      baseAccuracy: 20,
      baseHealth: 36,
      deflection: 10,
      fortitude: 20,
      reflex: 20,
      willpower: 20,
      healthModifier: 12,
    },
    resource: {
      name: 'MANA',
      baseValue: 50,
      valueModifier: 10,
    },
  }),
  SCOUT: new CharacterClass({
    name: 'SCOUT',
    description: `Moving like a phantom, the Scout embodies speed and agility. They weave through enemy lines, delivering swift strikes and evading counterattacks with ease. Their mastery of movement and their ability to exploit weaknesses make them elusive and deadly skirmishers on the battlefield.`,
    statistics: {
      baseAccuracy: 30,
      baseHealth: 36,
      deflection: 15,
      fortitude: 20,
      reflex: 20,
      willpower: 20,
      healthModifier: 12,
    },
    resource: {
      name: 'OPPORTUNITY',
      baseValue: 5,
      valueModifier: 0,
    },
  }),
  HEALER: new CharacterClass({
    name: 'HEALER',
    description: `More than just menders of wounds, the Healer is a source of support and empowerment for their allies. They can enhance their companions' abilities, bolster their defenses, and provide the vital energy needed to overcome challenging encounters. Their strategic use of supportive magic can turn the tide of any conflict.`,
    statistics: {
      baseAccuracy: 20,
      baseHealth: 36,
      deflection: 15,
      fortitude: 20,
      reflex: 20,
      willpower: 20,
      healthModifier: 12,
    },
    resource: {
      name: 'FAITH',
      baseValue: 30,
      valueModifier: 10,
    },
  }),
};
