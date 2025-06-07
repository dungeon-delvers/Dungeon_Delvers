import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('race_data', {
    id: 'id',
    name: { type: 'race', notNull: true },
    base_constitution: { type: 'integer', notNull: true },
    base_dexterity: { type: 'integer', notNull: true },
    base_intellect: { type: 'integer', notNull: true },
    base_might: { type: 'integer', notNull: true },
    base_perception: { type: 'integer', notNull: true },
    base_resolve: { type: 'integer', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('race_data')
}
