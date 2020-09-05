import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { UserResponse } from '../../users/responses/user.response';
import { UsersService } from '../../users/services/users.service';
import { CredentialsDto } from '../dtos/credentials.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticatedRequest } from '../types/authenticated-request.type';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Body() credentials: CredentialsDto,
    @Request() req: AuthenticatedRequest,
  ): any {
    this.logger.log(`credentials: ${credentials}`);
    return req.user;
  }

  @Post('register')
  async create(@Body() user: CreateUserDto): Promise<UserResponse> {
    const users = await this.usersService.create(user);

    return { data: { user: this.usersService.cleanUsers(users) } };
  }
}
