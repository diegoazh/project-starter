import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: string;

  bio: string;

  firstName: string;

  lastName: string;

  userId: string;

  createdAt: Date;

  updatedAt: Date;
}
