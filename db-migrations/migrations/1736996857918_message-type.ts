import { MESSAGE_TYPE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('message_type', Object.values(MESSAGE_TYPE))
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('message_type')
}
