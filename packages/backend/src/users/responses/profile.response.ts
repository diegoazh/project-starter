import { Profile } from '@prisma/client';

export class ProfileResponse implements Profile {
  id: number;

  bio: string;

  firstName: string;

  lastName: string;

  userId: number;

  createdAt: Date;

  updatedAt: Date;
}
