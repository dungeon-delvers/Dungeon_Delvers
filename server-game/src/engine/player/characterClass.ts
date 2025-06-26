import {
  CharacterClassName,
  ClassResource,
  ClassStatistics,
  ICharacterClass,
} from '@shared/types/characterClass';

export class CharacterClass implements ICharacterClass {
  get description() {
    return this.#description;
  }
  get name() {
    return this.#name;
  }
  get resource() {
    return this.#resource;
  }
  get statistics() {
    return this.#statistics;
  }
  #description: string;
  #name: CharacterClassName;
  #resource: ClassResource;

  #statistics: ClassStatistics;
  constructor({
    description,
    name,
    resource,
    statistics,
  }: Omit<ICharacterClass, 'calculateAccuracy' | 'calculateHealth'>) {
    this.#name = name;
    this.#description = description;
    this.#statistics = statistics;
    this.#resource = resource;
  }
}

/** See about moving these values to the Database for easier modifications */
export const CharacterClasses = {
  FIGHTER: new CharacterClass({
    description: `The Fighter stands as the unwavering bulwark on the battlefield. Tempered by rigorous training and clad in formidable armor, they are masters of close-quarters combat. Wielding a variety of weapons with brutal efficiency, they excel at both dealing significant damage and weathering the fiercest assaults, making them the linchpin of any successful party.`,
    name: 'FIGHTER',
    resource: {
      baseValue: 30,
      name: 'STAMINA',
      valueModifier: 10,
    },
    statistics: {
      baseAccuracy: 30,
      baseHealth: 42,
      deflection: 25,
      fortitude: 20,
      healthModifier: 14,
      reflex: 20,
      willpower: 15,
    },
  }),
  HEALER: new CharacterClass({
    description: `More than just menders of wounds, the Healer is a source of support and empowerment for their allies. They can enhance their companions' abilities, bolster their defenses, and provide the vital energy needed to overcome challenging encounters. Their strategic use of supportive magic can turn the tide of any conflict.`,
    name: 'HEALER',
    resource: {
      baseValue: 30,
      name: 'FAITH',
      valueModifier: 10,
    },
    statistics: {
      baseAccuracy: 20,
      baseHealth: 36,
      deflection: 15,
      fortitude: 20,
      healthModifier: 12,
      reflex: 20,
      willpower: 20,
    },
  }),
  MAGE: new CharacterClass({
    description: `The Mage commands the raw power of the elements and the intricate energies of the arcane. Through years of study and focused will, they can conjure devastating spells, from searing flames and crackling lightning to freezing blizzards and mystical projectiles. Their command over these potent forces makes them a formidable source of ranged damage and control on the battlefield.`,
    name: 'MAGE',
    resource: {
      baseValue: 50,
      name: 'MANA',
      valueModifier: 10,
    },
    statistics: {
      baseAccuracy: 20,
      baseHealth: 36,
      deflection: 10,
      fortitude: 20,
      healthModifier: 12,
      reflex: 20,
      willpower: 20,
    },
  }),
  SCOUT: new CharacterClass({
    description: `Moving like a phantom, the Scout embodies speed and agility. They weave through enemy lines, delivering swift strikes and evading counterattacks with ease. Their mastery of movement and their ability to exploit weaknesses make them elusive and deadly skirmishers on the battlefield.`,
    name: 'SCOUT',
    resource: {
      baseValue: 5,
      name: 'OPPORTUNITY',
      valueModifier: 0,
    },
    statistics: {
      baseAccuracy: 30,
      baseHealth: 36,
      deflection: 15,
      fortitude: 20,
      healthModifier: 12,
      reflex: 20,
      willpower: 20,
    },
  }),
};
