import { VISIBILITY } from '../consts'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('player_character_visibility', [...VISIBILITY])
  pgm.createTable('player_character', {
    id: 'id',
    user_id: { type: 'integer', notNull: true },
    logged_in: { type: 'boolean', notNull: true, default: false },
    name: { type: 'varchar(300)', notNull: true },
    surname: { type: 'varchar(300)' },
    race: { type: 'race', notNull: true },
    gender: { type: 'gender', notNull: true },
    character_class: { type: 'player_class', notNull: true },
    constitution: { type: 'integer', notNull: true },
    dexterity: { type: 'integer', notNull: true },
    intellect: { type: 'integer', notNull: true },
    might: { type: 'integer', notNull: true },
    perception: { type: 'integer', notNull: true },
    resolve: { type: 'integer', notNull: true },
    current_health: { type: 'integer', notNull: true },
    max_health: { type: 'integer', notNull: true },
    visibility: {
      type: 'player_character_visibility',
      notNull: true,
      default: 'PUBLIC',
    },
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
  pgm.dropTable('player_character')
}
