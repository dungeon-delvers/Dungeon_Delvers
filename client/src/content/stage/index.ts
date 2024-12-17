import { Entry } from './entry';
import { Exit } from './exit';
import { Heal } from './heal';
import { Monster } from './monster';
import { Treasure } from './treasure';

export { Room } from './room';

export const Rooms = { Entry, Exit, Heal, Monster, Treasure };
export const isRoomKey = <Rooms>(x: Rooms, k: PropertyKey): k is keyof Rooms => {
  return k in Rooms;
};
