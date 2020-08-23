import { BadRequestException, Injectable } from '@nestjs/common';
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

    if (savedUser.password === user.oldPassword) {
      savedUser.email = user.email;
      savedUser.username = user.username;
      savedUser.password = user.newPassword;
      return this.prisma.user.update({ where: { id }, data: { ...savedUser } });
    }

    throw new BadRequestException('The current password does not match');
  }

  async updateProperty(id: number, user: PatchUserDto): Promise<User> {
    const savedUser = await this.prisma.user.findOne({ where: { id } });

    if (savedUser.password === user.oldPassword) {
      const { email, newPassword: password, username } = user;
      savedUser.email = email || savedUser.email;
      savedUser.username = username || savedUser.username;
      savedUser.password = password || savedUser.password;
      return this.prisma.user.update({ where: { id }, data: { ...savedUser } });
    }

    throw new BadRequestException('The current password does not match');
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
