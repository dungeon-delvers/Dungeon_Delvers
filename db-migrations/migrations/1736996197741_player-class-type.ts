import { PLAYER_CLASS_NAMES } from '../consts'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('player_class', [...PLAYER_CLASS_NAMES])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('player_class')
}
