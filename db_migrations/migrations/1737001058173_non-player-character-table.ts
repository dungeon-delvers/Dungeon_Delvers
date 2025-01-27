import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
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
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('non_player_character')
}
