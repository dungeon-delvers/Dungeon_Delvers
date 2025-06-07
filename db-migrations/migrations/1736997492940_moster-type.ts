import { MONSTER_TYPE } from '../consts'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('monster_type', [...MONSTER_TYPE])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('moster_type')
}
