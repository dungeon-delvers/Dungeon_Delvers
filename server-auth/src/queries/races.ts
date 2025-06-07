import { pool } from '@/services/database/postgres';

export const RACE_NAMES = ['HUMAN', 'DWARF', 'ORC', 'GOBLIN'] as const;

export type RaceName = (typeof RACE_NAMES)[number];

export type RaceData = {
  base_constitution: number;
  base_dexterity: number;
  base_intellect: number;
  base_might: number;
  base_perception: number;
  base_resolve: number;
  description: string;
  id: number;
  name: RaceName;
};

export const getRaces = async () => {
  const query = `SELECT * FROM race_data`;
  return (await pool.query<RaceData>(query)).rows;
};
