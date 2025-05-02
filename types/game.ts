import { Vector3 } from '@babylonjs/core';
export const ABILITY_EFFECT_TYPE = [
  'ALTERATION',
  'BUFF',
  'DAMAGE',
  'DEBUFF',
  'HEALING',
] as const;

export type AbilityEffectType = (typeof ABILITY_EFFECT_TYPE)[number];

export type ActionStats = {
  accuracy: number;
  actionSpeed: number;
  areaOfEffect: number;
  damageMod: number;
  duration: number;
  healing: number;
};

export type ActorType = {
  id: string;
  stats: ActionStats & DefenseStats & PassiveStats;
  isAlive: boolean;
  name: string;
  position: Vector3;
  rotation: Vector3;
  zoneId: string;
  attackResolution: (
    target: ActorType,
    defenseStat: keyof DefenseStats
  ) => AttackResult;
  calculateDamage: (
    target: ActorType,
    defenseStat: keyof DefenseStats,
    minDamage: number,
    maxDamage: number
  ) => number | 'MISS';
};

export const ATTACK_RESULTS = ['CRITICAL', 'HIT', 'MISS', 'GRAZE'] as const;

export type AttackResult = (typeof ATTACK_RESULTS)[number];

export const ATTRIBUTES = ['CON', 'DEX', 'INT', 'MIG', 'PER', 'RES'] as const;

export type Attribute = (typeof ATTRIBUTES)[number];

export type Attributes = Record<Attribute, number>;

export type BaseStats = DefenseStats &
  ActionStats & {
    accuracy: number;
    health: number;
  };

export type DefenseStats = {
  deflection: number;
  fortitude: number;
  reflex: number;
  willpower: number;
};

export const GENDER = ['FEMALE', 'MALE', 'NON-BINARY'] as const;

export type Gender = (typeof GENDER)[number];

export const ITEM_SLOT = [
  'PRIMARY_SLOT',
  'SECONDARY_SLOT',
  'RANGED',
  'HEAD',
  'ARMS',
  'SHOULDER',
  'BACK',
  'CHEST',
  'LEGS',
  'FEET',
  'HANDS',
  'NECK',
  'WRIST',
  'BRACLET1',
  'BRACLET2',
  'RING1',
  'RING2',
] as const;

export type ItemSlot = (typeof ITEM_SLOT)[number];

export const ITEM_TYPE = [
  'WEAPON',
  'ARMOR',
  'CONSUMABLE',
  'QUEST',
  'INGREDIENT',
  'MISC',
  'LORE',
  'NO_DROP',
] as const;

export type ItemType = (typeof ITEM_TYPE)[number];

export const MESSAGE_TYPE = [
  'AUCTION',
  'COMBAT',
  'EMOTE',
  'GUILD',
  'OUT_OF_CHARACTER',
  'PARTY',
  'SAY',
  'SHOUT',
  'SYSTEM',
  'WHISPER',
] as const;

export type MessageType = (typeof MESSAGE_TYPE)[number];

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

export type PassiveStats = {
  concentration: number;
  currentHealth: number;
  maxHealth: number;
};

export const PLAYER_CLASS = ['FIGHTER', 'MAGE', 'SCOUT', 'HEALER'] as const;

export type PlayerClass = (typeof PLAYER_CLASS)[number];

export type PlayerCharacter = ActorType & {
  userId: string;
  surname?: string;
  race: Race;
  gender: Gender;
  playerClass: PlayerClass;
  level: number;
  visibility: Visiblity;
};
export type PlayerCharacterCreation = Omit<
  PlayerCharacter,
  | 'id'
  | 'level'
  | 'surname'
  | 'current_health'
  | 'zoneId'
  | 'locX'
  | 'locY'
  | 'locZ'
>;

export const RACE = ['DWARF', 'GOBLIN', 'HUMAN', 'ORC'] as const;

export type Race = (typeof RACE)[number];

export type RaceData = Attributes & {
  race: Race;
  description: string;
};

export const STATS = [
  'ACCURACY',
  'ACTION_SPEED',
  'AREA_OF_EFFECT',
  'CONCENTRATION',
  'DAMAGE',
  'DEFLECTION',
  'DURATION',
  'FORTITUDE',
  'HEALING',
  'HEALTH',
] as const;

export type Stat = (typeof STATS)[number];

export interface User {
  id: number;
  email: string;
  password_hash: string;
  username: string;
  role: UserRole;
  loggedin: boolean;
  currentCharacterId: number | null;
  createdAt: string;
  updatedAt: string;
}

export const USER_ROLE = ['ADMIN', 'BANNED', 'PLAYER'] as const;

export type UserRole = (typeof USER_ROLE)[number];

export const VISIBILITY = ['PUBLIC', 'ANONYMOUS', 'ROLEPLAY'] as const;
export type Visiblity = (typeof VISIBILITY)[number];
