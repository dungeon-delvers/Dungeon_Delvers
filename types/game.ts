import { Scene, Vector3 } from '@babylonjs/core';
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
  attributes: AttributesType;
  id: number;
  isAlive: boolean;
  name: string;
  position: Vector3;
  rotation: Vector3;
  stats: ActionStats & DefenseStats & PassiveStats;
  zoneId: number;
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
  type: MonsterType;
};

export type ActorCreationType = Omit<
  ActorType,
  'attackResolution' | 'calculateDamage' | 'stats'
> & {
  baseStats: BaseStats;
};

export const ATTACK_RESULTS = ['CRITICAL', 'HIT', 'MISS', 'GRAZE'] as const;

export type AttackResult = (typeof ATTACK_RESULTS)[number];

export const ATTRIBUTES = ['CON', 'DEX', 'INT', 'MIG', 'PER', 'RES'] as const;

export type Attribute = (typeof ATTRIBUTES)[number];

export type AttributesType = Record<Attribute, number>;

export type BaseStats = {
  accuracy: number;
  defense: DefenseStats;
  health: number;
};

export type ClassStats = {
  base: {
    accuracy: number;
    defense: DefenseStats;
    health: number;
  };
  levelMod: {
    accuracy: number;
    health: number;
  };
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

export type PlayerClass = {
  defense: DefenseStats;
  description: string;
  name: PlayerClassName;
  calculateAccuracy: (level: number) => number;
  calculateHealth: (level: number) => number;
};

export type PlayerClassCreation = Omit<
  PlayerClass,
  'calculateAccuracy' | 'defense' | 'calculateHealth'
> & {
  classStats: ClassStats;
};

export const PLAYER_CLASS_NAMES = [
  'FIGHTER',
  'MAGE',
  'SCOUT',
  'HEALER',
] as const;

export type PlayerClassName = (typeof PLAYER_CLASS_NAMES)[number];

export type PlayerCharacter = ActorType & {
  gender: Gender;
  level: number;
  playerClass: PlayerClassName;
  race: Race;
  surname?: string;
  userId: number;
  visibility: Visibility;
};

export type PlayerCharacterCreation = Omit<
  PlayerCharacter,
  'attackResolution' | 'calculateDamage' | 'type' | 'stats'
>;

export const RACE = ['DWARF', 'GOBLIN', 'HUMAN', 'ORC'] as const;

export type Race = (typeof RACE)[number];

export type RaceData = AttributesType & {
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
  createdAt: string;
  currentCharacterId: number | null;
  email: string;
  id: number;
  loggedin: boolean;
  password_hash: string;
  role: UserRole;
  updatedAt: string;
  username: string;
}

export const USER_ROLE = ['ADMIN', 'BANNED', 'PLAYER'] as const;

export type UserRole = (typeof USER_ROLE)[number];

export const VISIBILITY = ['PUBLIC', 'ANONYMOUS', 'ROLEPLAY'] as const;

export type Visibility = (typeof VISIBILITY)[number];

export type ZoneType = {
  fileName: string;
  id: number;
  scene: Scene;
  initialize: () => Promise<void>;
  serializeScene: () => Promise<any>;
};
