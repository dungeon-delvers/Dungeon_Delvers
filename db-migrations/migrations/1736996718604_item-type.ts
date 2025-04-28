import { ITEM_TYPE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('item_type', [...ITEM_TYPE])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('item_type')
}
