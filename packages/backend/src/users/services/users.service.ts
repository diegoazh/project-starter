import { Injectable } from '@nestjs/common';
import { FindManyUserArgs, Subset } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDeletedResponse } from '../responses/user-deleted.response';
import { UserResponse } from '../responses/user.response';
import { UsersCountResponse } from '../responses/users-count.response';
import { UsersResponse } from '../responses/users.response';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async find(
    query?: Subset<FindManyUserArgs, FindManyUserArgs>,
  ): Promise<UsersResponse> {
    const users = await this.prisma.user.findMany(query);

    return { data: { users } };
  }

  async findById(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findOne({ where: { id } });

    return { data: { user } };
  }

  async count(
    query?: Pick<
      FindManyUserArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<UsersCountResponse> {
    const count = await this.prisma.user.count(query);

    return { data: { users: { count } } };
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    const user = await this.prisma.user.create({ data });

    return { data: { user } };
  }

  async update(id: number, data: UpdateUserDto): Promise<UserResponse> {
    const savedUser = await this.prisma.user.findOne({ where: { id } });

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...savedUser, ...data },
    });

    return { data: { user } };
  }

  async updateProperty(id: number, user: PatchUserDto): Promise<UserResponse> {
    const savedUser = await this.prisma.user.findOne({ where: { id } });
    let newUser = null;

    const mustBeUpdated = Object.keys(user).reduce((needsUpdate, property) => {
      if (user[property] && savedUser[property] !== user[property]) {
        savedUser[property] = user[property];
        return true;
      }

      return needsUpdate;
    }, false);

    if (mustBeUpdated) {
      newUser = await this.prisma.user.update({
        where: { id },
        data: { ...savedUser },
      });
    }

    return { data: { user: newUser || savedUser } };
  }

  async remove(id: number): Promise<UserDeletedResponse> {
    const deleted = await this.prisma.user.delete({ where: { id } });

    return { data: { user: { deleted } } };
  }
}
