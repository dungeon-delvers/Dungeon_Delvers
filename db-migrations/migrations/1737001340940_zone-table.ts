import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('zone', {
    id: 'id',
    name: { type: 'varchar(300)', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('zone')
}
