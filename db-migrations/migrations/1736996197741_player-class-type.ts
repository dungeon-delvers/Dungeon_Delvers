import { PLAYER_CLASS } from 'types/game'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('player_class', [...PLAYER_CLASS])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('player_class')
}
