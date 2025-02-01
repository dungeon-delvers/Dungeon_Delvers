import { ATTRIBUTE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('player_character', {
    id: 'id',
    user_id: { type: 'integer', notNull: true },
    logged_in: { type: 'boolean', notNull: true, default: false },
    name: { type: 'varchar(300)', notNull: true },
    surname: { type: 'varchar(300)' },
    race: { type: 'race', notNull: true },
    gender: { type: 'gender', notNull: true },
    class: { type: 'player_class', notNull: true },
    [ATTRIBUTE.CON]: { type: 'integer', notNull: true },
    [ATTRIBUTE.DEX]: { type: 'integer', notNull: true },
    [ATTRIBUTE.INT]: { type: 'integer', notNull: true },
    [ATTRIBUTE.MIG]: { type: 'integer', notNull: true },
    [ATTRIBUTE.PER]: { type: 'integer', notNull: true },
    [ATTRIBUTE.RES]: { type: 'integer', notNull: true },
    level: { type: 'integer', notNull: true, default: 1 },
    current_health: { type: 'integer' },
    zoneId: { type: 'integer' },
    locX: { type: 'integer' },
    locY: { type: 'integer' },
    locZ: { type: 'integer' },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('player_character')
}
