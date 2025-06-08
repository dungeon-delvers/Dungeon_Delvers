import { DefenseStats } from './defense';

export type Gender = 'MALE' | 'FEMALE' | 'NON-BINARY' | 'OTHER';

export type CharacterProps = DefenseStats & {
  baseAccuracy: number;
  constitution: number;
  currentHealth: number;
  dexterity: number;
  drArcane: number;
  drCold: number;
  drCorrosion: number;
  drCrush: number;
  drFire: number;
  drPierce: number;
  drPoison: number;
  drShock: number;
  drSlash: number;
  gender: Gender;
  intellect: number;
  level: number;
  maxHealth: number;
  might: number;
  name: string;
  perception: number;
  resourceName: 'MANA' | 'STAMINA' | 'FAITH' | 'OPPORTUNITY';
  resourceMax: number;
  resourceValue: number;
  resolve: number;
  zoneId: number;
};

export const BUFFABLE_STATS = [
  'deflection',
  'fortitude',
  'reflex',
  'willpower',
  'drArcane',
  'drCold',
  'drCorrosion',
  'drCrush',
  'drFire',
  'drPierce',
  'drPoison',
  'drShock',
  'drSlash',
  'constitution',
  'dexterity',
  'intellect',
  'might',
  'perception',
  'resolve',
  'maxHealth',
  'accuracy',
] as const;

export type BuffableStat = (typeof BUFFABLE_STATS)[number];

export type Buff = {
  buffAmount: number;
  duration: number;
  id: number;
  name: string;
  buffStat: BuffableStat;
};

export type AppliedBuff = Buff & {
  timeout: NodeJS.Timeout;
  appliedAt: number;
};
