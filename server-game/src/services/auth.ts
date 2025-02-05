import { getUserFromID } from '@/queries/user';

export const authenticateJWT = (id: number) => {
  return getUserFromID(id);
};
