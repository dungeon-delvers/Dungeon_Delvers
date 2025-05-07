import { ITEM_SLOT } from 'types/game'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('item_slot', [...ITEM_SLOT])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('item_slot')
}
