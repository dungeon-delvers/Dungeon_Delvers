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
  id: number;
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

export type CharacterQueryResult = {
  id: number;
  name: string;
  constitution: number;
  dexterity: number;
  intellect: number;
  might: number;
  perception: number;
  resolve: number;
  deflection: number;
  fortitude: number;
  reflex: number;
  willpower: number;
  accuracy: number;
  damage_min: number;
  damage_max: number;
  current_health: number;
  max_health: number;
  npc_type: NpcType;
  monster_type: MonsterType;
  level: number;
  zone_id: number;
  location_x: number;
  location_y: number;
  location_z: number;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
};

export const MONSTER_TYPE = [
  'ABERRATION',
  'BEAST',
  'CONSTRUCT',
  'DRAGON',
  'ELEMENTAL',
  'ETHEREAL',
  'FAIRY',
  'GIANT',
  'HUMANOID',
  'INFERNAL',
  'MAGICAL_BEAST',
  'OOZE',
  'OUTSIDER',
  'PLANT',
  'UNDEAD',
] as const;

export type MonsterType = (typeof MONSTER_TYPE)[number];

export const NPC_TYPE = [
  'BANKER',
  'MERCHANT',
  'MONSTER',
  'QUEST_GIVER',
  'TRAINER',
] as const;

export type NpcType = (typeof NPC_TYPE)[number];
