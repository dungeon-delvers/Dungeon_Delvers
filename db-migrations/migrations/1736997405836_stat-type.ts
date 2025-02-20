import { STATS } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('stat', Object.values(STATS))
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('stat')
}
