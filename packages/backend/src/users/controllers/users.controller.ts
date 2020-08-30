import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyUserArgs, Subset } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponse } from '../responses/user.response';
import { UsersService } from '../services/users.service';

@ApiTags('Users controller')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  find(
    @Query() query?: Subset<FindManyUserArgs, FindManyUserArgs>,
  ): Promise<UserResponse[]> {
    return this.usersService.find(query);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<UserResponse> {
    return this.usersService.findById(id);
  }

  @Get('count')
  count(
    @Query()
    query: Pick<
      FindManyUserArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.usersService.count(query);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.usersService.update(id, user);
  }

  @Patch(':id')
  updateProperty(
    @Param('id') id: number,
    user: PatchUserDto,
  ): Promise<UserResponse> {
    return this.usersService.updateProperty(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<UserResponse> {
    return this.usersService.remove(id);
  }
}
