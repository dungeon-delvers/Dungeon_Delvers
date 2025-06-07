import { Actor } from '@/engine/core/actor';
import { pool } from '@/services/database/postgres';
import {
  Gender,
  PlayerCharacter,
  PlayerClassName,
  Race,
  Visibility,
} from 'types/game';

type PlayerResult = {
  id: number;
  user_id: number;
  logged_in: boolean;
  name: string;
  surname: string | null;
  race: Race;
  gender: Gender;
  player_class: PlayerClassName;
  con: number;
  dex: number;
  int: number;
  mig: number;
  per: number;
  res: number;
  deflection: number;
  fortitude: number;
  reflex: number;
  accuracy: number;
  max_health: number;
  current_health: number;
  is_alive: boolean;
  visibility: Visibility;
  level: number;
  zone_id: number;
  loc_x: number;
  loc_y: number;
  loc_z: number;
  rot_x: number;
  rot_y: number;
  rot_z: number;
};

export const createPlayerCharacter = async (playerCharacter: Actor) => {
  const query = {
    text: `INSERT INTO player_character
    (
      accuracy,
      con,
      current_health,
      deflection,
      dex,
      fortitude,
      gender,
      int,
      is_alive,
      level,
      loc_x,
      loc_y,
      loc_z,
      logged_in,
      max_health,
      mig,
      name,
      per,
      player_class,
      race,
      reflex,
      res,
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
      $28,
      $29
    ) RETURNING *`,
    values: [
      playerCharacter.userId,
      playerCharacter.loggedIn,
      playerCharacter.general.name,
      playerCharacter.surname,
      playerCharacter.race,
      playerCharacter.gender,
      playerCharacter.playerClass,
      playerCharacter.attributes.con,
      playerCharacter.attributes.dex,
      playerCharacter.attributes.int,
      playerCharacter.attributes.mig,
      playerCharacter.attributes.per,
      playerCharacter.attributes.res,
      playerCharacter.passiveStats.currentHealth,
      playerCharacter.general.isAlive,
      playerCharacter.visibility,
      playerCharacter.general.level,
      playerCharacter.general.zoneId,
      playerCharacter.general.location.x,
      playerCharacter.general.location.y,
      playerCharacter.general.location.z,
      playerCharacter.general.rotation.x,
      playerCharacter.general.rotation.y,
      playerCharacter.general.rotation.z,
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
  const result = await pool.query<PlayerResult>(query);
  return result.rows[0];
};
