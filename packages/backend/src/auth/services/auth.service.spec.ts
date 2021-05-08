import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from './auth.service';

const usersServiceMock = {};
const bcryptServiceMock = {};
const jwtServiceMock = {};

describe('AuthService', () => {
  let service: AuthService;
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
    usersService = module.get<UsersService>(UsersService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
    expect(bcryptService).toBeDefined();
  });
});
