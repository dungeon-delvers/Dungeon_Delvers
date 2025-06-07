export const CHARACTER_CLASS_NAMES = [
  'FIGHTER',
  'MAGE',
  'SCOUT',
  'HEALER',
] as const;

export type CharacterClassName = (typeof CHARACTER_CLASS_NAMES)[number];

type Gender = 'MALE' | 'FEMALE' | 'NON-BINARY' | 'OTHER';

export type PlayerCharacter = {
  class: CharacterClassName;
  constitution: number;
  dexterity: number;
  intellect: number;
  gender: Gender;
  might: number;
  name: string;
  perception: number;
  race: RaceName;
  resolve: number;
  userId: number;
  zoneId: number;
};

import { pool } from '@/services/database/postgres';
import { RaceName } from './races';

export const createPlayerCharacter = async (
  id: number,
  playerCharacter: PlayerCharacter
) => {
  const query = {
    text: `
    INSERT INTO player_character (
      user_id,
      name,
      race,
      gender,
      character_class,
      constitution,
      dexterity,
      intellect,
      might,
      perception,
      resolve,
      zone_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    values: [
      id,
      playerCharacter.name,
      playerCharacter.race,
      playerCharacter.gender,
      playerCharacter.class,
      playerCharacter.constitution,
      playerCharacter.dexterity,
      playerCharacter.intellect,
      playerCharacter.might,
      playerCharacter.perception,
      playerCharacter.resolve,
      1, // Default zone_id, can be changed later
    ],
  };
  return (await pool.query<PlayerCharacter>(query)).rows[0];
};

export const getPlayerCharactersByUserID = async (userID: number) => {
  const query = {
    text: 'SELECT * FROM player_character WHERE user_id = $1',
    values: [userID],
  };
  return (await pool.query<PlayerCharacter>(query)).rows;
};

export const getCharacterByID = async (id: number) => {
  const query = {
    text: 'SELECT * FROM character WHERE id = $1',
    values: [id],
  };
  return (await pool.query<PlayerCharacter>(query)).rows[0];
};
