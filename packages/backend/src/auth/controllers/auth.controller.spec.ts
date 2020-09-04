import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { UsersService } from '../../users/services/users.service';
import { AuthController } from './auth.controller';

const usersServiceMock = {
  find: jest.fn(() => []),
  findById: jest.fn(() => ({})),
  count: jest.fn(() => 1),
  create: jest.fn(() => ({})),
  update: jest.fn(() => ({})),
  updateProperty: jest.fn(() => ({})),
  remove: jest.fn(() => ({})),
  cleanUsers: jest.fn(() => ({})),
};

describe('Auth Controller', () => {
  let controller: AuthController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should call usersService.create with provided args when receive a POST HTTP request on /users', async () => {
    // Arrange
    const user: CreateUserDto = {
      email: 'test@test.com',
      password: 'secret',
      username: 'funnyName',
    };

    // Act
    await controller.create(user);

    // Assert
    expect(usersService.create).toHaveBeenCalledTimes(1);
    expect(usersService.create).toHaveBeenCalledWith(user);
    expect(usersService.cleanUsers).toHaveBeenCalledTimes(1);
    expect(usersService.cleanUsers).toHaveBeenCalledWith({});
  });
});
