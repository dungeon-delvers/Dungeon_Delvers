import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    INSERT INTO non_player_character (
      name,
      constitution,
      dexterity,
      intellect,
      might,
      perception,
      resolve,
      deflection,
      fortitude,
      reflex,
      willpower,
      accuracy,
      damage_min,
      damage_max,
      current_health,
      max_health,
      npc_type,
      monster_type,
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
      'A rat',
      10, 10, 10, 10, 10, 10,
      30, 20, 20, 20,
      30,
      1, 5,
      30, 30,
      'MONSTER',
      'BEAST',
      1,
      1,
      5, 0, 0,
      0, 0, 0
    )
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DELETE * FROM non_player_character`)
}
