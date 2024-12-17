export interface IUser {
  id: number;
  email: string;
  password_hash: string;
  username: string;
  role: 'ADMIN' | 'BANNED' | 'USER';
  loggedin: boolean;
  currentCharacterId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password_hash: string;
}
