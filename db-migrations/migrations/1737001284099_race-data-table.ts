import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('race_data', {
    id: 'id',
    race: { type: 'race', notNull: true },
    CON: { type: 'integer', notNull: true },
    DEX: { type: 'integer', notNull: true },
    INT: { type: 'integer', notNull: true },
    MIG: { type: 'integer', notNull: true },
    PER: { type: 'integer', notNull: true },
    RES: { type: 'integer', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('race_data')
}
