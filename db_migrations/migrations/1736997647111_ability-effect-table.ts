import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('ability_effect', {
    id: 'id',
    abilityId: { type: 'integer', notNull: true },
    effect: { type: 'ability_effect_type', notNull: true },
    value: { type: 'integer' },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ability_effect')
}
