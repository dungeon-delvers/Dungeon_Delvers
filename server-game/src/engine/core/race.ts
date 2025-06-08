import { RaceName, RaceProps } from '@shared/types/race';

export class Race {
  get attributes() {
    return this.#attributes;
  }
  get description() {
    return this.#description;
  }
  get name() {
    return this.#name;
  }

  #attributes: {
    constitution: number;
    dexterity: number;
    intellect: number;
    might: number;
    perception: number;
    resolve: number;
  };

  #description: string;

  #name: RaceName;

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
}

export const Races = {
  DWARF: new Race({
    constitution: 12,
    description:
      'Sturdy and resilient, dwarves are known for their craftsmanship and endurance.',
    dexterity: 8,
    intellect: 9,
    might: 11,
    name: 'DWARF',
    perception: 10,
    resolve: 12,
  }),
  GOBLIN: new Race({
    constitution: 9,
    description:
      'Cunning and resourceful, goblins are often underestimated but can be formidable.',
    dexterity: 12,
    intellect: 10,
    might: 10,
    name: 'GOBLIN',
    perception: 11,
    resolve: 10,
  }),
  HUMAN: new Race({
    constitution: 10,
    description: 'Versatile and adaptable, humans excel in various roles.',
    dexterity: 10,
    intellect: 10,
    might: 11,
    name: 'HUMAN',
    perception: 10,
    resolve: 11,
  }),
  ORC: new Race({
    constitution: 11,
    description:
      'Fierce and strong, orcs are known for their combat prowess and resilience.',
    dexterity: 10,
    intellect: 9,
    might: 12,
    name: 'ORC',
    perception: 10,
    resolve: 10,
  }),
};
