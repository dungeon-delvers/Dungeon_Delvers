export const ATTRIBUTES = ['CON', 'DEX', 'INT', 'MIG', 'PER', 'RES'] as const;

export type Attribute = (typeof ATTRIBUTES)[number];

export type Attributes = Record<Attribute, number>;

export const ABILITY_EFFECT_TYPE = [
  'ALTERATION',
  'BUFF',
  'DAMAGE',
  'DEBUFF',
  'HEALING',
] as const;

export type AbilityEffectType = (typeof ABILITY_EFFECT_TYPE)[number];

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

export const NPC_TYPE = [
  'BANKER',
  'MERCHANT',
  'MONSTER',
  'QUEST_GIVER',
  'TRAINER',
] as const;

export type NpcType = (typeof NPC_TYPE)[number];

export const PLAYER_CLASS = ['FIGHTER', 'MAGE', 'SCOUT', 'HEALER'] as const;

export type PlayerClass = (typeof PLAYER_CLASS)[number];

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

export type PlayerCharacter = Attributes & {
  user_id: number;
  name: string;
  surname: string;
  race: Race;
  gender: Gender;
  class: PlayerClass;
  level: number;
  current_health?: number;
  zoneId: number;
  locX: number;
  locY: number;
  locZ: number;
};

export const RACE = ['DWARF', 'GOBLIN', 'HUMAN', 'ORC'] as const;

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

export const USER_ROLE = ['ADMIN', 'BANNED', 'PLAYER'] as const;

export type UserRole = (typeof USER_ROLE)[number];

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
