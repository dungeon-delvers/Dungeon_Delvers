import { USER_ROLE } from 'types/game'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('app_user', {
    id: 'id',
    email: { type: 'varchar(300)', notNull: true, unique: true },
    password_hash: { type: 'varchar(300)', notNull: true },
    username: { type: 'varchar(300)', notNull: true, unique: true },
    role: { type: 'user_role', notNull: true, default: USER_ROLE.PLAYER },
    loggedin: { type: 'boolean', notNull: true, default: false },
    currentCharacterId: { type: 'integer' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('app_user')
}
