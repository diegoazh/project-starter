import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;

  email: string;

  password: string;

  username: string | null;

  role: 'USER' | 'ADMIN';

  createdAt: Date;

  updatedAt: Date;
}

export const enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
