import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../../users/constants/user.constant';
import { UserEntity } from '../../users/entities/user.entity';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from './auth.service';

const jwtServiceMock = {
  sign: jest.fn(() => 'abcdefghijklmnopqrstuvwxyz'),
};
const usersServiceMock = {
  findOne: jest.fn(() => ({})),
};
const bcryptServiceMock = {
  checkPassword: jest.fn(() => true),
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: BcryptService, useValue: bcryptServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user when its credentials was validated successfully', async () => {
    // Arrange
    const savedUser: Partial<UserEntity> = {
      email: 'test@test.com',
      password: 'superSecretAtAll',
      username: 'test',
      role: UserRole.USER,
      id: 'abcd-efgh-ijkl-mnop',
    };
    const data = {
      username: savedUser.username,
      email: savedUser.email,
      password: savedUser.password,
    };
    jest
      .spyOn(usersServiceMock, 'findOne')
      .mockImplementationOnce(() => Promise.resolve(savedUser));
    const { password, ...expectedResult } = savedUser;
    const { password: password2, ...expectedFindOneArgs } = data;

    // Act
    const result = await service.validateUser(data);

    // Assert
    expect(usersService.findOne).toHaveBeenCalledTimes(1);
    expect(usersService.findOne).toHaveBeenCalledWith(expectedFindOneArgs);
    expect(bcryptService.checkPassword).toHaveBeenCalledTimes(1);
    expect(bcryptService.checkPassword).toHaveBeenCalledWith(
      data.password,
      savedUser.password,
    );
    expect(result).toEqual(expectedResult);
  });

  it('should return null when its credentials was validated unsuccessfully', async () => {
    // Arrange
    const savedUser: Partial<UserEntity> = {
      email: 'test@test.com',
      password: 'superSecretAtAll',
      username: 'test',
      role: UserRole.USER,
      id: 'abcd-efgh-ijkl-mnop',
    };
    const data = {
      username: savedUser.username,
      email: savedUser.email,
      password: 'different',
    };
    jest
      .spyOn(usersServiceMock, 'findOne')
      .mockImplementationOnce(() => Promise.resolve(savedUser));
    jest
      .spyOn(bcryptServiceMock, 'checkPassword')
      .mockImplementationOnce(() => false);
    const { password: password2, ...expectedFindOneArgs } = data;

    // Act
    const result = await service.validateUser(data);

    // Assert
    expect(usersService.findOne).toHaveBeenCalledTimes(1);
    expect(usersService.findOne).toHaveBeenCalledWith(expectedFindOneArgs);
    expect(bcryptService.checkPassword).toHaveBeenCalledTimes(1);
    expect(bcryptService.checkPassword).toHaveBeenCalledWith(
      data.password,
      savedUser.password,
    );
    expect(result).toBeNull();
  });

  it('should return an access_token when a user logged in', () => {
    // Arrange
    const user = {
      username: 'test',
      id: 'abcd-efgh-ijkl',
      email: 'test@test.com',
    };
    const expectedPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const expectedResult = { access_token: 'abcdefghijklmnopqrstuvwxyz' };

    // Act
    const result = service.login(user);

    // Assert
    expect(jwtService.sign).toHaveBeenCalledTimes(1);
    expect(jwtService.sign).toHaveBeenCalledWith(expectedPayload);
    expect(result).toEqual(expectedResult);
  });
});
