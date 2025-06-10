import { CharacterProps, Gender } from './character';
import { CharacterClassName } from './characterClass';
import { DefenseType } from './defense';
import { RaceName } from './race';

export type PlayerCharacterProps = Omit<
  CharacterProps,
  'baseAccuracy' | DefenseType | 'resourceName'
> & {
  className: CharacterClassName;
  raceName: RaceName;
  userId: number;
};

export type PlayerCharacterCreationProps = {
  userId: number;
  name: string;
  race: RaceName;
  gender: Gender;
  playerClass: CharacterClassName;
  constitution: number;
  dexterity: number;
  intellect: number;
  might: number;
  perception: number;
  resolve: number;
  zoneId: number;
};

export type PlayerCharacterQueryResult = {
  id: number;
  user_id: number;
  logged_in: boolean;
  name: string;
  surname: string | null;
  race: RaceName;
  gender: Gender;
  player_class: CharacterClassName;
  constitution: number;
  dexterity: number;
  intellect: number;
  might: number;
  perception: number;
  resolve: number;
  current_health: number;
  max_health: number;
  visibility: Visibility;
  level: number;
  zone_id: number;
  location_x: number;
  location_y: number;
  location_z: number;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
};

export type Visibility = 'PUBLIC' | 'ANONYMOUS' | 'ROLEPLAY';
