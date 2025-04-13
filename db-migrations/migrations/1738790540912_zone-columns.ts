import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('zone', {
    asset: { type: 'varchar(300)', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('zone', 'asset')
}
