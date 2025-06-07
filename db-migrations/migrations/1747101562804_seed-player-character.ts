import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    INSERT INTO player_character (
      user_id,
      logged_in,
      name,
      surname,
      race,
      gender,
      character_class,
      constitution,
      dexterity,
      intellect,
      might,
      perception,
      resolve,
      current_health,
      max_health,
      visibility,
      level,
      zone_id,
      location_x,
      location_y,
      location_z,
      rotation_x,
      rotation_y,
      rotation_z
    )
    VALUES (
      1,
      true,
      'Ricard',
      NULL,
      'HUMAN',
      'MALE',
      'FIGHTER',
      16,
      10,
      10,
      20,
      10,
      11,
      42,
      42,
      'PUBLIC',
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0
    )
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DELETE * FROM player_character`)
}
