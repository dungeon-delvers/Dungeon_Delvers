import { MESSAGE_TYPE } from '../consts'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('message_type', [...MESSAGE_TYPE])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('message_type')
}
