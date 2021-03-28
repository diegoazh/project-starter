import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindManyUserArgs, Subset } from 'prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDeletedResponse } from '../responses/user-deleted.response';
import { UserResponse } from '../responses/user.response';
import { UsersCountResponse } from '../responses/users-count.response';
import { UsersResponse } from '../responses/users.response';
import { UsersService } from '../services/users.service';

@ApiTags('Users controller')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(
    @Query() query?: Subset<FindManyUserArgs, FindManyUserArgs>,
  ): Promise<UsersResponse> {
    const users = await this.usersService.find(query);

    return { data: { users: this.usersService.cleanUsers(users) } };
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserResponse> {
    const user = await this.usersService.findById(id);

    return { data: { user: this.usersService.cleanUsers(user) } };
  }

  @Get('count')
  async count(
    @Query()
    query: Pick<
      FindManyUserArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<UsersCountResponse> {
    const count = await this.usersService.count(query);

    return { data: { users: { count } } };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserResponse> {
    const updatedUser = await this.usersService.update(id, user);

    return { data: { user: this.usersService.cleanUsers(updatedUser) } };
  }

  @Patch(':id')
  async updateProperty(
    @Param('id') id: number,
    user: PatchUserDto,
  ): Promise<UserResponse> {
    const updatedUser = await this.usersService.updateProperty(id, user);

    return { data: { user: this.usersService.cleanUsers(updatedUser) } };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<UserDeletedResponse> {
    const user = await this.usersService.remove(id);

    return { data: { user: { deleted: this.usersService.cleanUsers(user) } } };
  }
}
