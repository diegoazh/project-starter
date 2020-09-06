import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { UserWithoutPassword } from '../../users/types/user-types.type';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    userData: Partial<UserEntity>,
  ): Promise<UserWithoutPassword | null> {
    this.logger.log(JSON.stringify(userData));
    const { password: sentPassword, ...cleanUserData } = userData;
    const user = await this.usersService.findOne(cleanUserData);

    if (user && this.bcryptService.checkPassword(sentPassword, user.password)) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as UserWithoutPassword;
    }

    return null;
  }

  login(user: UserWithoutPassword): { access_token: string } {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
