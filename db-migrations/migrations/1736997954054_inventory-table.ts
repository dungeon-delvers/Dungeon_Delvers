import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('inventory', {
    id: 'id',
    characterId: { type: 'integer', notNull: true },
    itemId: { type: 'integer', notNull: true },
    quantity: { type: 'integer' },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('inventory')
}
