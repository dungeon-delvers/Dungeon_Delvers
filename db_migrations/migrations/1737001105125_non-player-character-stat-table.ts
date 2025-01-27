import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('non_player_character_stat', {
    id: 'id',
    npcId: { type: 'integer', notNull: true },
    stat: { type: 'stat', notNull: true },
    value: { type: 'integer', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('non_player_character_stat')
}
