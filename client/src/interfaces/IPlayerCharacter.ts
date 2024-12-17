export interface IPlayerCharacter {
  id: number;
  user_id: number;
  name: string;
  surname: string;
  race: 'HUMAN' | 'DWARF' | 'GOBLIN' | 'ORC';
  gender: 'MALE' | 'FEMALE';
  class: 'FIGHTER' | 'MAGE' | 'SCOUT' | 'HEALER';
  con: number;
  dex: number;
  int: number;
  mig: number;
  per: number;
  res: number;
  level: number;
  current_health: number;
  zoneId: number;
  locX: number;
  locY: number;
  locZ: number;
}
