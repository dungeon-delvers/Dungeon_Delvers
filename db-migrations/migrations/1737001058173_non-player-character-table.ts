import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('non_player_character', {
    id: 'id',
    name: { type: 'varchar(300)', notNull: true },
    constitution: { type: 'integer', notNull: true },
    dexterity: { type: 'integer', notNull: true },
    intellect: { type: 'integer', notNull: true },
    might: { type: 'integer', notNull: true },
    perception: { type: 'integer', notNull: true },
    resolve: { type: 'integer', notNull: true },
    deflection: { type: 'integer', notNull: true, default: 0 },
    fortitude: { type: 'integer', notNull: true, default: 0 },
    reflex: { type: 'integer', notNull: true, default: 0 },
    willpower: { type: 'integer', notNull: true, default: 0 },
    accuracy: { type: 'integer', notNull: true, default: 0 },
    damage_min: { type: 'integer', notNull: true, default: 0 },
    damage_max: { type: 'integer', notNull: true, default: 0 },
    current_health: { type: 'integer', notNull: true },
    max_health: { type: 'integer', notNull: true },
    npc_type: { type: 'npc_type', notNull: true, default: 'MONSTER' },
    monster_type: { type: 'monster_type', notNull: true },
    level: { type: 'integer', notNull: true, default: 1 },
    zone_id: { type: 'integer' },
    location_x: {
      type: 'integer',
      default: 0,
    },
    location_y: {
      type: 'integer',
      default: 0,
    },
    location_z: {
      type: 'integer',
      default: 0,
    },
    rotation_x: {
      type: 'integer',
      default: 0,
    },
    rotation_y: {
      type: 'integer',
      default: 0,
    },
    rotation_z: {
      type: 'integer',
      default: 0,
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('non_player_character')
}
