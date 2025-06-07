import { Character, CharacterProps } from './character';
import { CharacterClasses, CharacterClassName } from './characterClass';
import { DefenseType } from './defense';
import { RaceName } from './race';

export type PlayerCharacterProps = Omit<
  CharacterProps,
  'baseAccuracy' | DefenseType | 'resourceName'
> & {
  className: CharacterClassName;
  raceName: RaceName;
};

export class PlayerCharacter extends Character {
  className: CharacterClassName;
  raceName: RaceName;

  constructor(props: PlayerCharacterProps) {
    const statistics = CharacterClasses[props.className].statistics;
    const { name: resourceName } = CharacterClasses[props.className].resource;
    super({
      ...props,
      ...statistics,
      resourceName,
    });
    this.className = props.className;
    this.raceName = props.raceName;
  }
}
