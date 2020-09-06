import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;

  email: string;

  password: string;

  username: string | null;

  role?: RoleType;

  createdAt: Date;

  updatedAt: Date;
}

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
