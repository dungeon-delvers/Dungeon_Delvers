import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('ability_stat', {
    id: 'id',
    abilityId: { type: 'integer', notNull: true },
    stat: { type: 'stat', notNull: true },
    value: { type: 'integer', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ability_stat')
}
