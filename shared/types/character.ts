import { Vector3 } from '@babylonjs/core';

import { IAttribute } from './attributes';
import { DefenseStats } from './defense';
import { Resource } from './resource';

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
  id: number;
  intellect: number;
  level: number;
  maxHealth: number;
  might: number;
  name: string;
  perception: number;
  resolve: number;
  resourceMax: number;
  resourceName: Pick<Resource, 'name'>['name'];
  resourceValue: number;
  zoneId: number;
};

export type Gender = 'FEMALE' | 'MALE' | 'NON-BINARY' | 'OTHER';

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

export type AppliedBuff = Buff & {
  appliedAt: number;
  timeout: NodeJS.Timeout;
};

export type Buff = {
  buffAmount: number;
  buffStat: BuffableStat;
  duration: number;
  id: number;
  name: string;
};

export type BuffableStat = (typeof BUFFABLE_STATS)[number];

export type CharacterQueryResult = {
  accuracy: number;
  constitution: number;
  current_health: number;
  damage_max: number;
  damage_min: number;
  deflection: number;
  dexterity: number;
  fortitude: number;
  id: number;
  intellect: number;
  level: number;
  location_x: number;
  location_y: number;
  location_z: number;
  max_health: number;
  might: number;
  monster_type: MonsterType;
  name: string;
  npc_type: NpcType;
  perception: number;
  reflex: number;
  resolve: number;
  willpower: number;
  zone_id: number;
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

export interface ICharacter {
  applyBuff(buffId: number): void;
  attributes: {
    constitution: IAttribute;
    dexterity: IAttribute;
    intellect: IAttribute;
    might: IAttribute;
    perception: IAttribute;
    resolve: IAttribute;
  };
  health: number;
  removeBuff(buffId: number): void;
  takeDamage(amount: number): void;
}

export type NpcType = (typeof NPC_TYPE)[number];