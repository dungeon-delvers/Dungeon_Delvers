import {
  ClassStats,
  PlayerClassCreation,
  PlayerClassName,
  PlayerClass as PlayerClassType,
} from 'types/game';
export class PlayerClass implements PlayerClassType {
  #classStats: ClassStats;
  #description: string;
  #name: PlayerClassName;
  constructor({ name, description, classStats }: PlayerClassCreation) {
    this.#name = name;
    this.#description = description;
    this.#classStats = classStats;
  }
  get description() {
    return this.#description;
  }
  get name() {
    return this.#name;
  }

  get defense() {
    return this.#classStats.base.defense;
  }

  calculateAccuracy = (level: number) =>
    this.#classStats.base.accuracy + this.#classStats.levelMod.accuracy * level;

  calculateHealth = (level: number) =>
    this.#classStats.base.health + this.#classStats.levelMod.health * level;
}

export const PlayerClasses = {
  FIGHTER: new PlayerClass({
    name: 'FIGHTER',
    description: `The Fighter stands as the unwavering bulwark on the battlefield. Tempered by rigorous training and clad in formidable armor, they are masters of close-quarters combat. Wielding a variety of weapons with brutal efficiency, they excel at both dealing significant damage and weathering the fiercest assaults, making them the linchpin of any successful party.`,
    classStats: {
      base: {
        accuracy: 30,
        defense: {
          deflection: 25,
          fortitude: 20,
          reflex: 20,
          willpower: 15,
        },
        health: 42,
      },
      levelMod: {
        accuracy: 3,
        health: 14,
      },
    },
  }),
  MAGE: new PlayerClass({
    name: 'MAGE',
    description: `The Mage commands the raw power of the elements and the intricate energies of the arcane. Through years of study and focused will, they can conjure devastating spells, from searing flames and crackling lightning to freezing blizzards and mystical projectiles. Their command over these potent forces makes them a formidable source of ranged damage and control on the battlefield.`,
    classStats: {
      base: {
        accuracy: 20,
        defense: {
          deflection: 20,
          fortitude: 15,
          reflex: 20,
          willpower: 30,
        },
        health: 36,
      },
      levelMod: {
        accuracy: 3,
        health: 12,
      },
    },
  }),
  SCOUT: new PlayerClass({
    name: 'SCOUT',
    description: `Moving like a phantom, the Scout embodies speed and agility. They weave through enemy lines, delivering swift strikes and evading counterattacks with ease. Their mastery of movement and their ability to exploit weaknesses make them elusive and deadly skirmishers on the battlefield.`,
    classStats: {
      base: {
        accuracy: 20,
        defense: {
          deflection: 20,
          fortitude: 15,
          reflex: 30,
          willpower: 20,
        },
        health: 36,
      },
      levelMod: {
        accuracy: 3,
        health: 12,
      },
    },
  }),
  HEALER: new PlayerClass({
    name: 'HEALER',
    description: `More than just menders of wounds, the Healer is a source of support and empowerment for their allies. They can enhance their companions' abilities, bolster their defenses, and provide the vital energy needed to overcome challenging encounters. Their strategic use of supportive magic can turn the tide of any conflict.`,
    classStats: {
      base: {
        accuracy: 30,
        defense: {
          deflection: 20,
          fortitude: 20,
          reflex: 20,
          willpower: 25,
        },
        health: 36,
      },
      levelMod: {
        accuracy: 3,
        health: 12,
      },
    },
  }),
};
