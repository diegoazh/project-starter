import { User } from '@prisma/client';

export class UserResponse implements User {
  id: number;

  email: string;

  password: string;

  username: string | null;

  createdAt: Date;

  updatedAt: Date;
}
