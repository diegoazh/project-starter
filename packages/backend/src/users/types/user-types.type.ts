import { User } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

export type UserWithoutPassword = Omit<Partial<UserEntity>, 'password'>;
export type CleanedUser<T> = T extends User ? User : User[];
