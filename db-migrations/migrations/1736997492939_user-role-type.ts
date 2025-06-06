import { USER_ROLE } from '../consts'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('user_role', [...USER_ROLE])
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('user_role')
}
