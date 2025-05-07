import { RACE } from 'types/game'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('race', [...RACE])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('race')
}
