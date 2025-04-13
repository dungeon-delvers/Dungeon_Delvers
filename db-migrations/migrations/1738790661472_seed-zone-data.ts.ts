import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    INSERT INTO zone (name, asset)
    VALUES
    ('Character Creation', 'character-create_scene.glb'),
    ('Rook Tower', 'rook_tower_06_25_2024.glb'),
    ('Test Scene', 'test_scene.glb')
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DELETE * FROM zone`)
}
