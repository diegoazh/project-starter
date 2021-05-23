import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserRole } from '../constants/user.constant';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserWithoutPassword } from '../types/user-types.type';
import { UsersService } from './users.service';

const prismaServiceMock = {
  user: {
    findMany: jest.fn(() => []),
    findFirst: jest.fn(() => ({})),
    findUnique: jest.fn(() => ({})),
    count: jest.fn(() => 1),
    create: jest.fn(() => ({})),
    update: jest.fn(() => ({})),
    delete: jest.fn(() => ({})),
  },
};

const bcryptServiceMock = {
  hashPassword: jest.fn((arg) => arg.split('').reverse().join('')),
};

const configServiceMock = {
  get: jest.fn(() => '200'),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let bcrypt: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: BcryptService, useValue: bcryptServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    bcrypt = module.get<BcryptService>(BcryptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call prisma.user.finMany with arguments when call find method', async () => {
    // Arrange
    const args = { where: { id: 1 } };
    const expectedArgs = {
      orderBy: { id: 'asc' },
      take: 200,
      where: { id: 1 },
    };

    // Act
    await service.find(args);

    // Assert
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.user.findMany).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma.user.findFirst with arguments when call findById method', async () => {
    // Arrange
    const id = 'abcd-efgh-ijkl-mnop';
    const expectedArgs = { where: { id } };

    // Act
    await service.findById(id);

    // Assert
    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith(expectedArgs);
  });

  it('should throw a not found exception when any user was found', async () => {
    // Arrange
    let errorThrown;
    const id = 'abcd-efgh-ijkl-mnop';
    const expectedArgs = { where: { id } };
    jest
      .spyOn(prismaServiceMock.user, 'findUnique')
      .mockImplementationOnce(() => Promise.resolve(null));

    // Act
    try {
      await service.findById(id);
    } catch (error) {
      errorThrown = error;
    }

    // Assert
    expect(errorThrown).toBeInstanceOf(NotFoundException);
    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma.user.findFirst with args when call findOne method', async () => {
    // Arrange
    const data: UserWithoutPassword = {
      username: 'test',
      email: 'test@test.com',
    };
    const expectedArgs = { where: { ...data } };

    // Act
    service.findOne(data);

    // Assert
    expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.user.findFirst).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma.user.count with arguments when call count method', async () => {
    // Arrange
    const args = { where: { username: 'John' } };

    // Act
    await service.count(args as any);

    // Assert
    expect(prisma.user.count).toHaveBeenCalledTimes(1);
    expect(prisma.user.count).toHaveBeenCalledWith(args);
  });

  it('should call prisma prisma.user.create with arguments when call create method', async () => {
    // Arrange
    const user: CreateUserDto = {
      email: 'test@test.com',
      password: 'secret',
      username: 'funnyName',
    };
    const expectedArgs = {
      data: {
        ...user,
        password: user.password.split('').reverse().join(''),
        role: UserRole.USER,
      },
    };

    // Act
    await service.create(user);

    // Assert
    expect(bcrypt.hashPassword).toHaveBeenCalledTimes(1);
    expect(bcrypt.hashPassword).toHaveBeenCalledWith(user.password);
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma prisma.user.update with arguments and update all user data when call update method', async () => {
    // Arrange
    const oldUser = {
      id: 1,
      email: 'old@test.com',
      password: 'oldSecret',
      username: 'oldFunnyName',
      createdAt: '12/12/12T10:30:23',
      updatedAt: '12/12/12T10:30:23',
    };
    const user: UpdateUserDto = {
      email: 'test@test.com',
      password: 'newSecret',
      username: 'funnyName',
    };
    const id = 'abcd-efgh-ijkl-mnop';

    const { email, password, username } = user;
    const expectedArgs = {
      where: { id },
      data: { ...oldUser, email, password, username },
    };

    (prisma.user.findUnique as any).mockReturnValue(oldUser);

    // Act
    await service.update(id, user);

    // Assert
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma prisma.user.update with arguments and update the passed properties of the user data when call updateProperty method', async () => {
    // Arrange
    const oldUser = {
      id: 10,
      email: 'old@test.com',
      password: 'oldSecret',
      username: 'oldFunnyName',
      createdAt: '12/12/12T10:30:23',
      updatedAt: '12/12/12T10:30:23',
    };
    const user: PatchUserDto = {
      email: 'test@test.com',
    };
    const id = 'abcd-efgh-ijkl-mnop';

    const { email } = user;
    const expectedArgs = {
      where: { id },
      data: { ...oldUser, email },
    };
    jest.spyOn(service, 'findById');
    (prisma.user.findUnique as any).mockReturnValue(oldUser);

    // Act
    await service.updateProperty(id, user);

    // Assert
    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma user.update with arguments and not update the user data when call updateProperty method with empty data', async () => {
    // Arrange
    const oldUser = {
      id: 'abcd-efgh-ijkl-mnop',
      email: 'old@test.com',
      password: 'oldSecret',
      username: 'oldFunnyName',
      createdAt: '12/12/12T10:30:23',
      updatedAt: '12/12/12T10:30:23',
    };
    const user: PatchUserDto = {
      email: '',
    };
    const id = 'abcd-efgh-ijkl-mnop';

    (prisma.user.findFirst as any).mockReturnValue(oldUser);

    // Act
    await service.updateProperty(id, user);

    // Assert
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('should call prisma user.delete with arguments when call remove method', async () => {
    // Arrange
    const id = 'abcd-efgh-ijkl-mnop';
    const expectedArgs = { where: { id } };

    // Act
    await service.remove(id);

    // Assert
    expect(prisma.user.delete).toHaveBeenCalledTimes(1);
    expect(prisma.user.delete).toHaveBeenCalledWith(expectedArgs);
  });

  it('should return a user with a fake password when is called with a user', () => {
    // Arrange
    const userWithPassword: Partial<UserEntity> = {
      username: 'test',
      email: 'test@test.com',
      password: 'secret',
    };
    const expectedUser: Partial<UserEntity> = {
      username: 'test',
      email: 'test@test.com',
      password: '********',
    };

    // Act
    const finalUser = service.cleanUsers(userWithPassword as UserEntity);

    // Assert
    expect(finalUser).toEqual(expectedUser);
  });

  it('should return an array of users with a fake passwords when is called with an array of users', () => {
    // Arrange
    const userWithPassword: Partial<UserEntity> = {
      username: 'test',
      email: 'test@test.com',
      password: 'secret',
    };
    const expectedUser: Partial<UserEntity> = {
      username: 'test',
      email: 'test@test.com',
      password: '********',
    };

    // Act
    const finalUser = service.cleanUsers([userWithPassword] as UserEntity[]);

    // Assert
    expect(finalUser).toEqual([expectedUser]);
  });
});
