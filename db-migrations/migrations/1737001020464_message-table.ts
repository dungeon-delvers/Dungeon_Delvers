import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('message', {
    id: 'id',
    type: { type: 'message_type', notNull: true },
    characterId: { type: 'integer', notNull: true },
    reciepientId: { type: 'integer' },
    message: { type: 'varchar(1000)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('message')
}
