import { Injectable } from '@nestjs/common';
import { FindManyUserArgs, Subset, User } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  find(query?: Subset<FindManyUserArgs, FindManyUserArgs>): Promise<User[]> {
    return this.prisma.user.findMany(query);
  }

  findById(id: number): Promise<User> {
    return this.prisma.user.findOne({ where: { id } });
  }

  count(
    query?: Pick<
      FindManyUserArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.prisma.user.count(query);
  }

  create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    const savedUser = await this.prisma.user.findOne({ where: { id } });

    return this.prisma.user.update({
      where: { id },
      data: { ...savedUser, ...user },
    });
  }

  async updateProperty(id: number, user: PatchUserDto): Promise<User> {
    const savedUser = await this.prisma.user.findOne({ where: { id } });

    const mustBeUpdated = Object.keys(user).reduce((needsUpdate, property) => {
      if (user[property] && savedUser[property] !== user[property]) {
        savedUser[property] = user[property];
        return true;
      }

      return needsUpdate;
    }, false);

    if (mustBeUpdated) {
      return this.prisma.user.update({ where: { id }, data: { ...savedUser } });
    }

    return savedUser;
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
