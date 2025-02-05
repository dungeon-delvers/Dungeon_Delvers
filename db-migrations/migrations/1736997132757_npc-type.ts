import { NPC_TYPE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType('npc_type', Object.values(NPC_TYPE))
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType('npc_type')
}
