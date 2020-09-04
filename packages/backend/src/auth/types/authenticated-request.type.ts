// eslint-disable-next-line import/no-extraneous-dependencies -- it's a NestJs dependency
import { Request } from 'express';
import { UserWithoutPassword } from '../../users/types/user-types.type';

export type AuthenticatedRequest = Request & { user: UserWithoutPassword };
