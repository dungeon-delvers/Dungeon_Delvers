import { pool } from '@/services/database/postgres';
import { PlayerCharacter } from '@/engine/player/playerCharacter';
import { PlayerCharacterQueryResult } from '@shared/types/playerCharacter';

export const createPlayerCharacter = async (
  playerCharacter: PlayerCharacter
) => {
  const query = {
    text: `INSERT INTO player_character
    (
      accuracy,
      constitution,
      current_health,
      deflection,
      dexterity,
      fortitude,
      gender,
      intellect,
      level,
      loc_x,
      loc_y,
      loc_z,
      logged_in,
      max_health,
      might,
      name,
      perception,
      player_class,
      race,
      reflex,
      resolve,
      rot_x,
      rot_y,
      rot_z,
      surname,
      user_id,
      visibility,
      zone_id
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11,
      $12,
      $13,
      $14,
      $15,
      $16,
      $17,
      $18,
      $19,
      $20,
      $21,
      $22,
      $23,
      $24,
      $25,
      $26,
      $27,
      $28
    ) RETURNING *`,
    values: [
      playerCharacter.userId,
      playerCharacter.loggedIn,
      playerCharacter.name,
      playerCharacter.surname,
      playerCharacter.raceName,
      playerCharacter.gender,
      playerCharacter.className,
      playerCharacter.attributes.constitution,
      playerCharacter.attributes.dexterity,
      playerCharacter.attributes.intellect,
      playerCharacter.attributes.might,
      playerCharacter.attributes.perception,
      playerCharacter.attributes.resolve,
      playerCharacter.health,
      playerCharacter.visibility,
      playerCharacter.level,
      playerCharacter.zoneId,
      playerCharacter.location.x,
      playerCharacter.location.y,
      playerCharacter.location.z,
      playerCharacter.rotation.x,
      playerCharacter.rotation.y,
      playerCharacter.rotation.z,
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
    text: `SELECT *
    FROM player_character
    WHERE id = $1`,
    values: [id],
  };
  const result = await pool.query<PlayerCharacterQueryResult>(query);
  return result.rows[0];
};
