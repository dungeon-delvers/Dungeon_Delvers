import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('item', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    type: { type: 'item_type', notNull: true },
    value: { type: 'integer', notNull: true },
    weight: { type: 'integer', notNull: true },
    slot: { type: 'item_slot', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('item')
}
