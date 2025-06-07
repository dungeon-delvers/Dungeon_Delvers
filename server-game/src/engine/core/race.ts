export const RACE_NAMES = ['HUMAN', 'DWARF', 'ORC', 'GOBLIN'] as const;

export type RaceName = (typeof RACE_NAMES)[number];

type RaceProps = {
  name: RaceName;
  description: string;
  constitution: number;
  dexterity: number;
  intellect: number;
  might: number;
  perception: number;
  resolve: number;
};

export class Race {
  #name: RaceName;
  #description: string;
  #attributes: {
    constitution: number;
    dexterity: number;
    intellect: number;
    might: number;
    perception: number;
    resolve: number;
  };

  constructor(props: RaceProps) {
    this.#name = props.name;
    this.#description = props.description;
    this.#attributes = {
      constitution: props.constitution,
      dexterity: props.dexterity,
      intellect: props.intellect,
      might: props.might,
      perception: props.perception,
      resolve: props.resolve,
    };
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get attributes() {
    return this.#attributes;
  }
}

export const Races = {
  DWARF: new Race({
    name: 'DWARF',
    description:
      'Sturdy and resilient, dwarves are known for their craftsmanship and endurance.',
    constitution: 12,
    dexterity: 8,
    intellect: 9,
    might: 11,
    perception: 10,
    resolve: 12,
  }),
  HUMAN: new Race({
    name: 'HUMAN',
    description: 'Versatile and adaptable, humans excel in various roles.',
    constitution: 10,
    dexterity: 10,
    intellect: 10,
    might: 11,
    perception: 10,
    resolve: 11,
  }),
  ORC: new Race({
    name: 'ORC',
    description:
      'Fierce and strong, orcs are known for their combat prowess and resilience.',
    constitution: 11,
    dexterity: 10,
    intellect: 9,
    might: 12,
    perception: 10,
    resolve: 10,
  }),
  GOBLIN: new Race({
    name: 'GOBLIN',
    description:
      'Cunning and resourceful, goblins are often underestimated but can be formidable.',
    constitution: 9,
    dexterity: 12,
    intellect: 10,
    might: 10,
    perception: 11,
    resolve: 10,
  }),
};
