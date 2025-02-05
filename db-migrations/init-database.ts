import { MigrationBuilder } from 'node-pg-migrate'
import {
  ABILITY_EFFECT_TYPE,
  ATTRIBUTE,
  PLAYER_CLASS,
  GENDER,
  ITEM_SLOT,
  ITEM_TYPE,
  MESSAGE_TYPE,
  NPC_TYPE,
  RACE,
  STATS,
  USER_ROLE,
} from '@dungeon-delvers/types'

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('ability_effect_type', [
    ABILITY_EFFECT_TYPE.ALTERATION,
    ABILITY_EFFECT_TYPE.BUFF,
    ABILITY_EFFECT_TYPE.DAMAGE,
    ABILITY_EFFECT_TYPE.DEBUFF,
    ABILITY_EFFECT_TYPE.HEALING,
  ])
  pgm.createType('attribute', [
    ATTRIBUTE.CON,
    ATTRIBUTE.DEX,
    ATTRIBUTE.INT,
    ATTRIBUTE.MIG,
    ATTRIBUTE.PER,
    ATTRIBUTE.RES,
  ])

  pgm.createType('class', [
    PLAYER_CLASS.FIGHTER,
    PLAYER_CLASS.MAGE,
    PLAYER_CLASS.SCOUT,
    PLAYER_CLASS.HEALER,
  ])
  pgm.createType('gender', [GENDER.MALE, GENDER.FEMALE])
  pgm.createType('item_slot', [
    ITEM_SLOT.PRIMARY_SLOT,
    ITEM_SLOT.SECONDARY_SLOT,
    ITEM_SLOT.RANGED,
    ITEM_SLOT.HEAD,
    ITEM_SLOT.ARMS,
    ITEM_SLOT.SHOULDER,
    ITEM_SLOT.BACK,
    ITEM_SLOT.CHEST,
    ITEM_SLOT.LEGS,
    ITEM_SLOT.FEET,
    ITEM_SLOT.HANDS,
    ITEM_SLOT.NECK,
    ITEM_SLOT.WRIST,
    ITEM_SLOT.BRACLET1,
    ITEM_SLOT.BRACLET2,
    ITEM_SLOT.RING1,
    ITEM_SLOT.RING2,
  ])
  pgm.createType('item_type', [
    ITEM_TYPE.WEAPON,
    ITEM_TYPE.ARMOR,
    ITEM_TYPE.CONSUMABLE,
    ITEM_TYPE.QUEST,
    ITEM_TYPE.INGREDIENT,
    ITEM_TYPE.MISC,
    ITEM_TYPE.LORE,
    ITEM_TYPE.NO_DROP,
  ])
  pgm.createType('message_type', [
    MESSAGE_TYPE.AUCTION,
    MESSAGE_TYPE.COMBAT,
    MESSAGE_TYPE.EMOTE,
    MESSAGE_TYPE.GUILD,
    MESSAGE_TYPE.OUT_OF_CHARACTER,
    MESSAGE_TYPE.PARTY,
    MESSAGE_TYPE.SAY,
    MESSAGE_TYPE.SHOUT,
    MESSAGE_TYPE.SYSTEM,
    MESSAGE_TYPE.WHISPER,
  ])
  pgm.createType('npc_type', [
    NPC_TYPE.BANKER,
    NPC_TYPE.MERCHANT,
    NPC_TYPE.MONSTER,
    NPC_TYPE.QUEST_GIVER,
    NPC_TYPE.TRAINER,
  ])
  pgm.createType('race', [RACE.DWARF, RACE.GOBLIN, RACE.HUMAN, RACE.ORC])
  pgm.createType('stat', [
    STATS.ACCURACY,
    STATS.ACTION_SPEED,
    STATS.AREA_OF_EFFECT,
    STATS.CONCENTRATION,
    STATS.DAMAGE,
    STATS.DEFLECTION,
    STATS.DURATION,
    STATS.FORTITUDE,
    STATS.HEALING,
    STATS.HEALTH,
  ])
  pgm.createType('user_role', [
    USER_ROLE.ADMIN,
    USER_ROLE.BANNED,
    USER_ROLE.PLAYER,
  ])
  pgm.createTable('ability', {
    id: 'id',
    name: { type: 'varchar(300)', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
    type: { type: 'varchar(1000)', notNull: true },
    value: { type: 'integer', notNull: true },
  })
  pgm.createTable('ability_effect', {
    id: 'id',
    abilityId: { type: 'integer', notNull: true },
    effect: { type: 'ability_effect_type', notNull: true },
    value: { type: 'integer' },
  })
  pgm.createTable('ability_attribute', {
    id: 'id',
    abilityId: { type: 'integer', notNull: true },
    attribute: { type: 'attribute', notNull: true },
    value: { type: 'integer', notNull: true },
  })
  pgm.createTable('ability_stat', {
    id: 'id',
    abilityId: { type: 'integer', notNull: true },
    stat: { type: 'stat', notNull: true },
    value: { type: 'integer', notNull: true },
  })
  pgm.createTable('app_user', {
    id: 'id',
    email: { type: 'varchar(300)', notNull: true, unique: true },
    password_hash: { type: 'varchar(300)', notNull: true },
    username: { type: 'varchar(300)', notNull: true, unique: true },
    role: { type: 'user_role', notNull: true, default: 'USER' },
    loggedin: { type: 'boolean', notNull: true, default: false },
    currentCharacterId: { type: 'integer' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('blocked', {
    characterId: { type: 'integer', notNull: true },
    blockedId: { type: 'integer', notNull: true },
  })
  pgm.createTable('friend', {
    characterId: { type: 'integer', notNull: true },
    friendId: { type: 'integer', notNull: true },
  })
  pgm.createTable('inventory', {
    id: 'id',
    characterId: { type: 'integer', notNull: true },
    itemId: { type: 'integer', notNull: true },
    quantity: { type: 'integer' },
  })
  pgm.createTable('item', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    type: { type: 'item_type', notNull: true },
    value: { type: 'integer', notNull: true },
    weight: { type: 'integer', notNull: true },
    slot: { type: 'item_slot', notNull: true },
  })
  pgm.createTable('item_attribute', {
    id: 'id',
    itemId: { type: 'integer', notNull: true },
    attribute: { type: 'attribute', notNull: true },
    value: { type: 'integer', notNull: true },
  })
  pgm.createTable('item_stat', {
    id: 'id',
    itemId: { type: 'integer', notNull: true },
    stat: { type: 'stat', notNull: true },
    value: { type: 'integer', notNull: true },
  })
  pgm.createTable('message', {
    id: 'id',
    type: { type: 'message_type', notNull: true },
    characterId: { type: 'integer', notNull: true },
    reciepientId: { type: 'integer' },
    message: { type: 'varchar(1000)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('non_player_character', {
    id: 'id',
    name: { type: 'varchar(300)', notNull: true },
    level: { type: 'integer', notNull: true, default: 1 },
    currentHealth: { type: 'integer', notNull: true },
    type: { type: 'npc_type', notNull: true, default: 'MONSTER' },
    zoneId: { type: 'integer' },
    locX: { type: 'integer' },
    locY: { type: 'integer' },
    locZ: { type: 'integer' },
  })
  pgm.createTable('non_player_character_stat', {
    id: 'id',
    npcId: { type: 'integer', notNull: true },
    stat: { type: 'stat', notNull: true },
    value: { type: 'integer', notNull: true },
  })
  pgm.createTable('non_player_character_ability', {
    id: 'id',
    npcId: { type: 'integer', notNull: true },
    abilityId: { type: 'integer', notNull: true },
  })
  pgm.createTable('player_character', {
    id: 'id',
    user_id: { type: 'integer', notNull: true },
    logged_in: { type: 'boolean', notNull: true, default: false },
    name: { type: 'varchar(300)', notNull: true },
    surname: { type: 'varchar(300)' },
    race: { type: 'race', notNull: true },
    gender: { type: 'gender', notNull: true },
    class: { type: 'class', notNull: true },
    [ATTRIBUTE.CON]: { type: 'integer', notNull: true },
    [ATTRIBUTE.DEX]: { type: 'integer', notNull: true },
    [ATTRIBUTE.INT]: { type: 'integer', notNull: true },
    [ATTRIBUTE.MIG]: { type: 'integer', notNull: true },
    [ATTRIBUTE.PER]: { type: 'integer', notNull: true },
    [ATTRIBUTE.RES]: { type: 'integer', notNull: true },
    level: { type: 'integer', notNull: true, default: 1 },
    current_health: { type: 'integer', notNull: true },
    zoneId: { type: 'integer' },
    locX: { type: 'integer' },
    locY: { type: 'integer' },
    locZ: { type: 'integer' },
  })
  pgm.createTable('race_data', {
    id: 'id',
    race: { type: 'race', notNull: true },
    [ATTRIBUTE.CON]: { type: 'integer', notNull: true },
    [ATTRIBUTE.DEX]: { type: 'integer', notNull: true },
    [ATTRIBUTE.INT]: { type: 'integer', notNull: true },
    [ATTRIBUTE.MIG]: { type: 'integer', notNull: true },
    [ATTRIBUTE.PER]: { type: 'integer', notNull: true },
    [ATTRIBUTE.RES]: { type: 'integer', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
  })
  pgm.createTable('zone', {
    id: 'id',
    name: { type: 'varchar(300)', notNull: true },
  })
  pgm.sql(`
    INSERT INTO race_data (
      name,
      ${ATTRIBUTE.CON},
      ${ATTRIBUTE.DEX},
      ${ATTRIBUTE.INT},
      ${ATTRIBUTE.MIG},
      ${ATTRIBUTE.PER},
      ${ATTRIBUTE.RES},
      description
    )
    VALUES
    ('${RACE.DWARF}', 12, 9, 10, 11, 10, 10, 'Said to be born from the flesh of the Earth Goddes Tremmir, these folk are gifted with an affinity for stone craft and metallurgy. Dwarves are known to "sing to the stones" to commune with earth and live in harmony both above as well as deep below in the caverns and tunnels that they call home. Dwarves are a strong and hardy race'),
    ('${RACE.HUMAN}', 10, 10, 10, 11, 10, 11,  'Said to have landed on the western shore of Weathermoore, five hundred ships founded the city of Westfall and since then humans have become one of the most prominent races on Weathermoor. Capable of both wonderful and terrible deeds, humans have made their mark on Atla, and are well regarded for thier adaptability and ambition.'),
    ('${RACE.ORC}', 11, 10, 9, 12, 10, 10, 'Born into servitude for the Demi-God of War Stratos, orcs arrived on Atla during the first Infernal Incursion. After the defeat of their masters at the hands of the gods, orcs were left to fend for themselves. Orcs are known for their strength and ferocity in battle, and are often regarded as brutes and savages. Their love of nature and respect of their ancestors have begun to soften the blows that had been dealt when first they arrived.'),
    ('${RACE.GOBLIN}', 9, 12, 10, 10, 11, 10, 'During the first Infernal Incursion, the Demi-God of Greed and Theft Covetix bestowed the union of orc and dwarf into the reviled Goblin. Said to have the prepensity for violence and greed, goblins are often regarded as the lowest of the low. However, goblins are known for their cunning and resourcefulness, and have been known to be quite loyal to those who have earned their trust.');
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ability_attribute')
  pgm.dropTable('ability_effect')
  pgm.dropTable('ability_stat')
  pgm.dropTable('ability')
  pgm.dropTable('app_user')
  pgm.dropTable('blocked')
  pgm.dropTable('friend')
  pgm.dropTable('inventory')
  pgm.dropTable('item_attribute')
  pgm.dropTable('item_stat')
  pgm.dropTable('item')
  pgm.dropTable('message')
  pgm.dropTable('non_player_character_ability')
  pgm.dropTable('non_player_character_stat')
  pgm.dropTable('non_player_character')
  pgm.dropTable('player_character')
  pgm.dropTable('zone')
  pgm.dropType('ability_effect_type')
  pgm.dropType('attribute')
  pgm.dropType('class')
  pgm.dropType('item_slot')
  pgm.dropType('item_type')
  pgm.dropType('message_type')
  pgm.dropType('npc_type')
  pgm.dropType('race')
  pgm.dropType('stat')
}
