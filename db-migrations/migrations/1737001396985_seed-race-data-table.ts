import { ATTRIBUTE, RACE } from '@dungeon-delvers/types'
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    INSERT INTO race_data (
      race,
      "${ATTRIBUTE.CON}",
      "${ATTRIBUTE.DEX}",
      "${ATTRIBUTE.INT}",
      "${ATTRIBUTE.MIG}",
      "${ATTRIBUTE.PER}",
      "${ATTRIBUTE.RES}",
      description
    )
    VALUES
    ('${RACE.DWARF}', 12, 9, 10, 11, 10, 10, 'Said to be born from the flesh of the Earth Goddes Tremmir, these folk are gifted with an affinity for stone craft and metallurgy. Dwarves are known to "sing to the stones" to commune with earth and live in harmony both above as well as deep below in the caverns and tunnels that they call home. Dwarves are a strong and hardy race'),
    ('${RACE.HUMAN}', 10, 10, 10, 11, 10, 11,  'Said to have landed on the western shore of Weathermoore, five hundred ships founded the city of Westfall and since then humans have become one of the most prominent races on Weathermoor. Capable of both wonderful and terrible deeds, humans have made their mark on Atla, and are well regarded for thier adaptability and ambition.'),
    ('${RACE.ORC}', 11, 10, 9, 12, 10, 10, 'Born into servitude for the Demi-God of War Stratos, orcs arrived on Atla during the first Infernal Incursion. After the defeat of their masters at the hands of the gods, orcs were left to fend for themselves. Orcs are known for their strength and ferocity in battle, and are often regarded as brutes and savages. Their love of nature and respect of their ancestors have begun to soften the blows that had been dealt when first they arrived.'),
    ('${RACE.GOBLIN}', 9, 12, 10, 10, 11, 10, 'During the first Infernal Incursion, the Demi-God of Greed and Theft Covetix bestowed the union of orc and dwarf into the reviled Goblin. Said to have the prepensity for violence and greed, goblins are often regarded as the lowest of the low. However, goblins are known for their cunning and resourcefulness, and have been known to be quite loyal to those who have earned their trust.');
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DELETE * FROM race_data`)
}
