import { CharacterClassName } from '@shared/types/characterClass';
import {
  PlayerCharacterProps,
  Visibility,
} from '@shared/types/playerCharacter';
import { RaceName } from '@shared/types/race';

import { Character } from './character';
import { CharacterClasses } from './characterClass';

export class PlayerCharacter extends Character {
  get className(): CharacterClassName {
    return this.#className;
  }
  set className(value: CharacterClassName) {
    this.#className = value;
  }
  get loggedIn(): boolean {
    return this.#loggedIn;
  }
  set loggedIn(value: boolean) {
    this.#loggedIn = value;
  }
  get raceName(): RaceName {
    return this.#raceName;
  }
  set raceName(value: RaceName) {
    this.#raceName = value;
  }
  get surname(): null | string {
    return this.#surname;
  }
  set surname(value: null | string) {
    this.#surname = value;
  }
  get userId(): number {
    return this.#userId;
  }
  set userId(value: number) {
    this.#userId = value;
  }
  get visibility(): Visibility {
    return this.#visibility;
  }
  set visibility(value: Visibility) {
    this.#visibility = value;
  }
  #className: CharacterClassName;
  #loggedIn: boolean;
  #raceName: RaceName;
  #surname: null | string = null;
  #userId: number;
  #visibility: Visibility = 'PUBLIC';

  constructor(props: PlayerCharacterProps) {
    const statistics = CharacterClasses[props.className].statistics;
    const { name: resourceName } = CharacterClasses[props.className].resource;
    super({
      ...props,
      ...statistics,
      resourceName,
    });
    this.#className = props.className;
    this.#raceName = props.raceName;
  }
}
