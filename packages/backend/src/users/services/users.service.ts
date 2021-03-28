import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { FindManyUserArgs, Subset } from 'prisma';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { RoleType } from '../entities/user.entity';
import { CleanedUser, UserWithoutPassword } from '../types/user-types.type';

@Injectable()
export class UsersService {
  private readonly password = '********';

  private readonly takeLimit: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly configService: ConfigService,
  ) {
    this.takeLimit = parseInt(
      this.configService.get<string>('USERS_TAKE_MAX'),
      10,
    );
  }

  find(query?: Subset<FindManyUserArgs, FindManyUserArgs>): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      take: this.takeLimit,
      ...query,
    });
  }

  findById(id: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  findOne(userData: UserWithoutPassword): Promise<User> {
    const query = { where: { ...userData } };
    return this.prisma.user.findFirst(query);
  }

  count(
    query?: Pick<
      FindManyUserArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.prisma.user.count(query);
  }

  create(data: CreateUserDto): Promise<User> {
    const password = this.bcrypt.hashPassword(data.password);
    return this.prisma.user.create({
      data: { ...data, password, role: RoleType.USER },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const savedUser = await this.prisma.user.findFirst({ where: { id } });

    return this.prisma.user.update({
      where: { id },
      data: { ...savedUser, ...data },
    });
  }

  async updateProperty(id: string, user: PatchUserDto): Promise<User> {
    const savedUser = await this.prisma.user.findFirst({ where: { id } });

    const mustBeUpdated = Object.keys(user).reduce((needsUpdate, property) => {
      if (user[property] && savedUser[property] !== user[property]) {
        savedUser[property] = user[property];
        return true;
      }

      return needsUpdate;
    }, false);

    if (mustBeUpdated) {
      return this.prisma.user.update({
        where: { id },
        data: { ...savedUser },
      });
    }

    return savedUser;
  }

  remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  public cleanUsers<T extends User | User[]>(data: T): CleanedUser<T> {
    if (Array.isArray(data)) {
      const newData = [...data].map<User>((user: User) => ({
        ...user,
        password: this.password,
      }));

      return (newData as unknown) as CleanedUser<T>;
    }

    return ({ ...data, password: this.password } as unknown) as CleanedUser<T>;
  }
}
