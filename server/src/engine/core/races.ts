import { ATTRIBUTES, Attributes } from './attribute';

export const races = [
  {
    race: 'DWARF',
    attributes: {
      CONSTITUTION: 12,
      DEXTERITY: 9,
      INTELLECT: 10,
      MIGHT: 11,
      PERCEPTION: 10,
      RESOLVE: 10,
    },
    description:
      "Said to be born from the flesh of the Earth Goddes Tremmir, these folk are gifted with an affinity for stone craft and metallurgy. Dwarves are known to 'sing to the stones' to commune with earth and live in harmony both above as well as deep below in the caverns and tunnels that they call home. Dwarves are a strong and hardy race",
  },
  {
    race: 'ELF',
    attributes: {
      CONSTITUTION: 9,
      DEXTERITY: 12,
      INTELLECT: 11,
      MIGHT: 10,
      PERCEPTION: 10,
      RESOLVE: 10,
    },
    description:
      'Known as the Sylvan folk, the elves are one of the older races to call Atla home. It is said that elves originally decend from dryads from the plane of Life and Growth. Elves are known for their affinity for nature and the arcane arts.',
  },
  {
    race: 'HUMAN',
    attributes: {
      CONSTITUTION: 10,
      DEXTERITY: 10,
      INTELLECT: 10,
      MIGHT: 11,
      PERCEPTION: 10,
      RESOLVE: 11,
    },
    description:
      'Said to have landed on the western shore of Weathermoore, five hundred ships founded the city of Westfall and since then humans have become one of the most prominent races on Weathermoor. Capable of both wonderful and terrible deeds, humans have made their mark on Atla, and are well regarded for thier adaptability and ambition.',
  },
  {
    race: 'ORC',
    attributes: {
      CONSTITUTION: 11,
      DEXTERITY: 10,
      INTELLECT: 9,
      MIGHT: 12,
      PERCEPTION: 10,
      RESOLVE: 10,
    },
    description:
      "Born into servitude for the Demi-God of War Stratos, orcs arrived on Atla during the first Infernal Incursion. After their master's defeat at the hands of the gods, orcs were left to fend for themselves. Orcs are known for their strength and ferocity in battle, and are often regarded as brutes and savages. Their love of nature and respect of their ancestors have begun to soften the blows that had been dealt when first they arrived.",
  },
  {
    race: 'GOBLIN',
    attributes: {
      CONSTITUTION: 9,
      DEXTERITY: 12,
      INTELLECT: 10,
      MIGHT: 10,
      PERCEPTION: 11,
      RESOLVE: 10,
    },
    description:
      'During the first Infernal Incursion, the Demi-God of Greed and Theft Covetix bestowed the union of orc and dwarf into the reviled Goblin. Said to have the prepensity for violence and greed, goblins are often regarded as the lowest of the low. However, goblins are known for their cunning and resourcefulness, and have been known to be quite loyal to those who have earned their trust.',
  },
  {
    race: 'HALF-ORC',
    attributes: {
      CONSTITUTION: 11,
      DEXTERITY: 10,
      INTELLECT: 10,
      MIGHT: 11,
      PERCEPTION: 10,
      RESOLVE: 10,
    },
    description:
      'The product of the union between humans and orcs, half-orcs bear a unique duality. Their human ancestry grants them intelligence and adaptability, while their orcish heritage brings strength and resilience. Often misunderstood, they seek to carve their own destinies and bridge the gap between two worlds, proving that true strength comes from unity.',
  },
] as const;

export type RaceName = (typeof races)[number]['race'];

export const raceArray = races.reduce<RaceName[]>((accumulator, raceData) => {
  const raceName = raceData.race as RaceName;
  return [...accumulator, raceName];
}, []);

export class Race {
  private _name: RaceName;
  private _attributes: Attributes;
  private _description: string;
  constructor(name: RaceName, attributes: Attributes, description: string) {
    this._name = name;
    this._attributes = attributes;
    this._description = description;
  }
  get name() {
    return this._name;
  }
  get attributes() {
    return this._attributes;
  }
  get description() {
    return this._description;
  }
}

export class Races {
  private _races: Record<RaceName, Race>;
  constructor() {
    this._races = races.reduce(
      (accumulator, { race, attributes: attributeValues, description }) => {
        accumulator[race as RaceName] = new Race(
          race,
          new Attributes({
            [ATTRIBUTES.CON]: attributeValues[ATTRIBUTES.CON],
            [ATTRIBUTES.DEX]: attributeValues[ATTRIBUTES.DEX],
            [ATTRIBUTES.INT]: attributeValues[ATTRIBUTES.INT],
            [ATTRIBUTES.MIG]: attributeValues[ATTRIBUTES.MIG],
            [ATTRIBUTES.PER]: attributeValues[ATTRIBUTES.PER],
            [ATTRIBUTES.RES]: attributeValues[ATTRIBUTES.RES],
          }),
          description,
        );
        return accumulator;
      },
      {} as Record<RaceName, Race>,
    );
  }
  race(race: RaceName) {
    return this._races[race];
  }
  attributes(race: RaceName) {
    return this._races[race].attributes;
  }
  description(race: RaceName) {
    return this._races[race].description;
  }
}
