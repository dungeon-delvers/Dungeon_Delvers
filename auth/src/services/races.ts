import { getRaces as getRaceQuery } from '@/queries/races';

export const getRaces = async () => {
  return getRaceQuery();
};
