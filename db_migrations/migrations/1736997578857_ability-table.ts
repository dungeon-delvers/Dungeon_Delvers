import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('ability', {
    id: 'id',
    name: { type: 'varchar(300)', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
    type: { type: 'varchar(1000)', notNull: true },
    value: { type: 'integer', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ability')
}
