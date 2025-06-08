import { DefenseStats } from './defense';

export const CHARACTER_CLASS_NAMES = [
  'FIGHTER',
  'MAGE',
  'SCOUT',
  'HEALER',
] as const;

export type CharacterClassName = (typeof CHARACTER_CLASS_NAMES)[number];

export type ClassResource = {
  name: 'MANA' | 'STAMINA' | 'FAITH' | 'OPPORTUNITY';
  baseValue: number;
  valueModifier: number;
};

export type ClassStatistics = DefenseStats & {
  baseAccuracy: number;
  baseHealth: number;
  healthModifier: number;
};

export type ICharacterClass = {
  description: string;
  name: CharacterClassName;
  statistics: ClassStatistics;
  resource: ClassResource;
};
