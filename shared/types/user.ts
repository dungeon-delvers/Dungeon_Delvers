export interface User {
  createdAt: string;
  currentCharacterId: number | null;
  email: string;
  id: number;
  loggedin: boolean;
  password_hash: string;
  role: UserRole;
  updatedAt: string;
  username: string;
}

export const USER_ROLE = ['ADMIN', 'BANNED', 'PLAYER'] as const;

export type UserRole = (typeof USER_ROLE)[number];
