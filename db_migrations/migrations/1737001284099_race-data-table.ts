import { ATTRIBUTE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
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
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('race_data')
}
