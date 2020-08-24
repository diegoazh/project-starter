import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

const usersServiceMock = {
  find: jest.fn(),
  findById: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateProperty: jest.fn(),
  remove: jest.fn(),
};

describe('Users Controller', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call usersService.find with provided args when receive a GET HTTP request on /users', async () => {
    // Arrange
    const username = 'john';
    const args = { where: { username } };

    // Act
    await controller.find(args);

    // Assert
    expect(usersService.find).toHaveBeenCalledTimes(1);
    expect(usersService.find).toHaveBeenCalledWith(args);
  });

  it('should call usersService.findById with provided args when receive a GET HTTP request on /users/:id', async () => {
    // Arrange
    const id = 1;

    // Act
    await controller.findById(id);

    // Assert
    expect(usersService.findById).toHaveBeenCalledTimes(1);
    expect(usersService.findById).toHaveBeenCalledWith(id);
  });

  it('should call usersService.count with provided args when receive a GET HTTP request on /users/count', async () => {
    // Arrange
    const args = { where: { username: 'Alice' } };

    // Act
    await controller.count(args);

    // Assert
    expect(usersService.count).toHaveBeenCalledTimes(1);
    expect(usersService.count).toHaveBeenCalledWith(args);
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
  });

  it('should call usersService.update with provided args when receive a PUT HTTP request on /users/:id', async () => {
    // Arrange
    const id = 1;
    const user: UpdateUserDto = {
      email: 'test@test.com',
      password: 'newSecret',
      username: 'funnyName',
    };

    // Act
    await controller.update(id, user);

    // Assert
    expect(usersService.update).toHaveBeenCalledTimes(1);
    expect(usersService.update).toHaveBeenCalledWith(id, user);
  });

  it('should call usersService.updateProperty with provided args when receive a PATCH HTTP request on /users/:id', async () => {
    // Arrange
    const id = 1;
    const user: PatchUserDto = {
      email: 'test@test.com',
    };

    // Act
    await controller.updateProperty(id, user);

    // Assert
    expect(usersService.updateProperty).toHaveBeenCalledTimes(1);
    expect(usersService.updateProperty).toHaveBeenCalledWith(id, user);
  });

  it('should call usersService.remove with provided args when receive a DELETE HTTP request on /users/:id', async () => {
    // Arrange
    const id = 1;

    // Act
    await controller.remove(id);

    // Assert
    expect(usersService.remove).toHaveBeenCalledTimes(1);
    expect(usersService.remove).toHaveBeenCalledWith(id);
  });
});
