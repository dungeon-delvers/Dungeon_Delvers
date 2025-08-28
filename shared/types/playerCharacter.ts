import { CharacterProps, Gender, ICharacter } from './character';
import { CharacterClassName } from './characterClass';
import { DefenseType } from './defense';
import { RaceName } from './race';

export interface IPlayerCharacter extends ICharacter {
  
  userId: number;
  visibility: Visibility;
}

export type PlayerCharacterCreationProps = {
  constitution: number;
  dexterity: number;
  gender: Gender;
  intellect: number;
  might: number;
  name: string;
  perception: number;
  playerClass: CharacterClassName;
  race: RaceName;
  resolve: number;
  userId: number;
  zoneId: number;
};

export type PlayerCharacterProps = Omit<
  CharacterProps,
  'baseAccuracy' | 'resourceName' | DefenseType
> & {
  className: CharacterClassName;
  raceName: RaceName;
  userId: number;
};

export type PlayerCharacterQueryResult = {
  constitution: number;
  current_health: number;
  dexterity: number;
  gender: Gender;
  id: number;
  intellect: number;
  level: number;
  location_x: number;
  location_y: number;
  location_z: number;
  logged_in: boolean;
  max_health: number;
  might: number;
  name: string;
  perception: number;
  player_class: CharacterClassName;
  race: RaceName;
  resolve: number;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
  surname: null | string;
  user_id: number;
  visibility: Visibility;
  zone_id: number;
};

export type Visibility = 'ANONYMOUS' | 'PUBLIC' | 'ROLEPLAY';
