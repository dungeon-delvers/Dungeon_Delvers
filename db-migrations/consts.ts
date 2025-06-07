export const ABILITY_EFFECT_TYPE = [
  'ALTERATION',
  'BUFF',
  'DAMAGE',
  'DEBUFF',
  'HEALING',
] as const

export const ATTACK_RESULTS = ['CRITICAL', 'HIT', 'MISS', 'GRAZE'] as const

export const ATTRIBUTES = [
  'constitution',
  'dexterity',
  'intellect',
  'might',
  'perception',
  'resolve',
] as const

export const GENDER = ['FEMALE', 'MALE', 'NON_BINARY'] as const

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
  'BRACLET_LEFT',
  'BRACLET_RIGHT',
  'RING_LEFT',
  'RING_RIGHT',
] as const

export const ITEM_TYPE = [
  'WEAPON',
  'ARMOR',
  'CONSUMABLE',
  'QUEST',
  'INGREDIENT',
  'MISC',
  'LORE',
  'NO_DROP',
] as const

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
] as const

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
] as const

export const NPC_TYPE = [
  'BANKER',
  'MERCHANT',
  'MONSTER',
  'QUEST_GIVER',
  'TRAINER',
] as const

export const PLAYER_CLASS_NAMES = [
  'FIGHTER',
  'MAGE',
  'SCOUT',
  'HEALER',
] as const

export const RACE = ['DWARF', 'GOBLIN', 'HUMAN', 'ORC'] as const

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
] as const

export const USER_ROLE = ['ADMIN', 'BANNED', 'PLAYER'] as const

export const VISIBILITY = ['PUBLIC', 'ANONYMOUS', 'ROLEPLAY'] as const
