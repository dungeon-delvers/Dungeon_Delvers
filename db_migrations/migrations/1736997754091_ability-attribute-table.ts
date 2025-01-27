import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('ability_attribute', {
    id: 'id',
    abilityId: { type: 'integer', notNull: true },
    attribute: { type: 'attribute', notNull: true },
    value: { type: 'integer', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ability_attribute')
}
