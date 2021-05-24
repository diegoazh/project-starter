import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from '../services/auth.service';
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

const authServiceMock = {
  login: jest.fn(() => ({ access_token: 'abcdefghi' })),
};

describe('Auth Controller', () => {
  let controller: AuthController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call authService.login when a user is logged in', async () => {
    // Arrange
    const credentials = { email: 'test@test.com', password: '123456' };
    const request = {
      user: { email: 'test@test.com', password: '123456', username: 'test' },
    };
    const expectedResult = { access_token: 'abcdefghi' };

    // Act
    const result = controller.login(credentials, request as any);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith(request.user);
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
