import { CharacterClassName } from '@shared/types/characterClass';
import {
  IPlayerCharacter,
  PlayerCharacterProps,
  Visibility,
} from '@shared/types/playerCharacter';
import { RaceName } from '@shared/types/race';

import { Character } from '../core/character';
import { CharacterClasses } from './characterClass';

export class PlayerCharacter extends Character implements IPlayerCharacter {
  className: CharacterClassName;
  loggedIn: boolean;
  surname: null | string = null;
  userId: number;
  visibility: Visibility = 'PUBLIC';

  constructor(props: PlayerCharacterProps) {
    const statistics = CharacterClasses[props.className].statistics;
    const { name: resourceName } = CharacterClasses[props.className].resource;
    super({
      ...props,
      ...statistics,
      resourceName,
    });
  }
}

// This function is a mock implementation for testing purposes.
export const getPlayerById = (_playerId: number) => {
  return new PlayerCharacter({
    className: 'FIGHTER',
    constitution: 10,
    currentHealth: 100,
    dexterity: 10,
    drArcane: 0,
    drCold: 0,
    drCorrosion: 0,
    drCrush: 0,
    drFire: 0,
    drPierce: 0,
    drPoison: 0,
    drShock: 0,
    drSlash: 0,
    gender: 'MALE',
    id: 1,
    intellect: 10,
    level: 1,
    maxHealth: 100,
    might: 10,
    name: 'TestPlayer',
    perception: 10,
    raceName: 'HUMAN',
    resolve: 10,
    resourceMax: 30,
    resourceValue: 30,
    userId: 1,
    zoneId: 1,
  });
};
