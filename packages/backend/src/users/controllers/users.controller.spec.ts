import { Test, TestingModule } from '@nestjs/testing';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

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
    expect(usersService.cleanUsers).toHaveBeenCalledTimes(1);
    expect(usersService.cleanUsers).toHaveBeenCalledWith([]);
  });

  it('should call usersService.findById with provided args when receive a GET HTTP request on /users/:id', async () => {
    // Arrange
    const id = 'abcd-efgh-ijkl-mnop';

    // Act
    await controller.findById(id);

    // Assert
    expect(usersService.findById).toHaveBeenCalledTimes(1);
    expect(usersService.findById).toHaveBeenCalledWith(id);
    expect(usersService.cleanUsers).toHaveBeenCalledTimes(1);
    expect(usersService.cleanUsers).toHaveBeenCalledWith({});
  });

  it('should call usersService.count with provided args when receive a GET HTTP request on /users/count', async () => {
    // Arrange
    const args = { where: { username: 'Alice' } } as any;

    // Act
    await controller.count(args);

    // Assert
    expect(usersService.count).toHaveBeenCalledTimes(1);
    expect(usersService.count).toHaveBeenCalledWith(args);
  });

  it('should call usersService.update with provided args when receive a PUT HTTP request on /users/:id', async () => {
    // Arrange
    const id = 'abcd-efgh-ijkl-mnop';
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
    expect(usersService.cleanUsers).toHaveBeenCalledTimes(1);
    expect(usersService.cleanUsers).toHaveBeenCalledWith({});
  });

  it('should call usersService.updateProperty with provided args when receive a PATCH HTTP request on /users/:id', async () => {
    // Arrange
    const id = 'abcd-efgh-ijkl-mnop';
    const user: PatchUserDto = {
      email: 'test@test.com',
    };

    // Act
    await controller.updateProperty(id, user);

    // Assert
    expect(usersService.updateProperty).toHaveBeenCalledTimes(1);
    expect(usersService.updateProperty).toHaveBeenCalledWith(id, user);
    expect(usersService.cleanUsers).toHaveBeenCalledTimes(1);
    expect(usersService.cleanUsers).toHaveBeenCalledWith({});
  });

  it('should call usersService.remove with provided args when receive a DELETE HTTP request on /users/:id', async () => {
    // Arrange
    const id = 'abcd-efgh-ijkl-mnop';

    // Act
    await controller.remove(id);

    // Assert
    expect(usersService.remove).toHaveBeenCalledTimes(1);
    expect(usersService.remove).toHaveBeenCalledWith(id);
    expect(usersService.cleanUsers).toHaveBeenCalledTimes(1);
    expect(usersService.cleanUsers).toHaveBeenCalledWith({});
  });
});
