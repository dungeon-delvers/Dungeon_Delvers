import { Race as RaceName } from '@dungeon-delvers/types';
import { Attributes } from './attribute';

export class Race {
  #name: RaceName;
  #attributes: Attributes;
  #description: string;
  constructor(name: RaceName, attributes: Attributes, description: string) {
    this.#name = name;
    this.#attributes = attributes;
    this.#description = description;
  }
  get name() {
    return this.#name;
  }
  get attributes() {
    return this.#attributes;
  }
  get description() {
    return this.#description;
  }
}
