import { User } from '@prisma/client';
import { ValueOf } from 'src/shared/types/user.type';
import { UserRole } from '../constants/user.constant';

export class UserEntity implements User {
  id: string;

  email: string;

  password: string;

  username: string | null;

  role: ValueOf<typeof UserRole>;

  createdAt: Date;

  updatedAt: Date;
}

export const enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
