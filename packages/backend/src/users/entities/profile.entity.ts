import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: number;

  bio: string;

  firstName: string;

  lastName: string;

  userId: number;

  createdAt: Date;

  updatedAt: Date;
}
