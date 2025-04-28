import { ABILITY_EFFECT_TYPE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('ability_effect_type', [...ABILITY_EFFECT_TYPE])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('ability_effect_type')
}
