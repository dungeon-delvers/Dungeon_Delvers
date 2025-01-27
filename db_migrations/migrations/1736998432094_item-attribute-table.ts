import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('item_attribute', {
    id: 'id',
    itemId: { type: 'integer', notNull: true },
    attribute: { type: 'attribute', notNull: true },
    value: { type: 'integer', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('item_attribute')
}
