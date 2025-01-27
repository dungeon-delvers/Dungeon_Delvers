export const ATTRIBUTE = {
  CON: 'CON',
  DEX: 'DEX',
  INT: 'INT',
  MIG: 'MIG',
  PER: 'PER',
  RES: 'RES',
};

export type Attribute = keyof typeof ATTRIBUTE;

export type Attributes = Record<Attribute, number>;

export const ABILITY_EFFECT_TYPE = {
  ALTERATION: 'ALTERATION',
  BUFF: 'BUFF',
  DAMAGE: 'DAMAGE',
  DEBUFF: 'DEBUFF',
  HEALING: 'HEALING',
};

export type AbilityEffectType = keyof typeof ABILITY_EFFECT_TYPE;

export const GENDER = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
};

export type Gender = keyof typeof GENDER;

export const ITEM_SLOT = {
  PRIMARY_SLOT: 'PRIMARY_SLOT',
  SECONDARY_SLOT: 'SECONDARY_SLOT',
  RANGED: 'RANGED',
  HEAD: 'HEAD',
  ARMS: 'ARMS',
  SHOULDER: 'SHOULDER',
  BACK: 'BACK',
  CHEST: 'CHEST',
  LEGS: 'LEGS',
  FEET: 'FEET',
  HANDS: 'HANDS',
  NECK: 'NECK',
  WRIST: 'WRIST',
  BRACLET1: 'BRACLET1',
  BRACLET2: 'BRACLET2',
  RING1: 'RING1',
  RING2: 'RING2',
};

export type ItemSlot = keyof typeof ITEM_SLOT;

export const ITEM_TYPE = {
  WEAPON: 'WEAPON',
  ARMOR: 'ARMOR',
  CONSUMABLE: 'CONSUMABLE',
  QUEST: 'QUEST',
  INGREDIENT: 'INGREDIENT',
  MISC: 'MISC',
  LORE: 'LORE',
  NO_DROP: 'NO_DROP',
};

export type ItemType = keyof typeof ITEM_TYPE;

export const MESSAGE_TYPE = {
  AUCTION: 'AUCTION',
  COMBAT: 'COMBAT',
  EMOTE: 'EMOTE',
  GUILD: 'GUILD',
  OUT_OF_CHARACTER: 'OUT_OF_CHARACTER',
  PARTY: 'PARTY',
  SAY: 'SAY',
  SHOUT: 'SHOUT',
  SYSTEM: 'SYSTEM',
  WHISPER: 'WHISPER',
};

export type MessageType = keyof typeof MESSAGE_TYPE;

export const NPC_TYPE = {
  BANKER: 'BANKER',
  MERCHANT: 'MERCHANT',
  MONSTER: 'MONSTER',
  QUEST_GIVER: 'QUEST_GIVER',
  TRAINER: 'TRAINER',
};

export type NpcType = keyof typeof NPC_TYPE;

export const PLAYER_CLASS = {
  FIGHTER: 'FIGHTER',
  MAGE: 'MAGE',
  SCOUT: 'SCOUT',
  HEALER: 'HEALER',
};

export type PlayerClass = keyof typeof PLAYER_CLASS;

export type PlayerCharacter = Attributes & {
  id: number;
  user_id: number;
  name: string;
  surname: string;
  race: Race;
  gender: Gender;
  class: PlayerClass;
  level: number;
  current_health: number;
  zoneId: number;
  locX: number;
  locY: number;
  locZ: number;
};

export const RACE = {
  DWARF: 'DWARF',
  GOBLIN: 'GOBLIN',
  HUMAN: 'HUMAN',
  ORC: 'ORC',
};

export type Race = keyof typeof RACE;

export type RaceData = Attributes & {
  race: Race;
  description: string;
};

export const STATS = {
  ACCURACY: 'ACCURACY',
  ACTION_SPEED: 'ACTION_SPEED',
  AREA_OF_EFFECT: 'AREA_OF_EFFECT',
  CONCENTRATION: 'CONCENTRATION',
  DAMAGE: 'DAMAGE',
  DEFLECTION: 'DEFLECTION',
  DURATION: 'DURATION',
  FORTITUDE: 'FORTITUDE',
  HEALING: 'HEALING',
  HEALTH: 'HEALTH',
};

export type Stat = keyof typeof STATS;

export const USER_ROLE = {
  ADMIN: 'ADMIN',
  BANNED: 'BANNED',
  PLAYER: 'PLAYER',
};

export type UserRole = keyof typeof USER_ROLE;

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
