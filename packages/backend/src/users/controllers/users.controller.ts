import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  find() {
    return this.usersService.find();
  }

  @Get(':id')
  findById() {
    return this.usersService.findById();
  }

  @Get('count')
  count() {
    return this.usersService.count();
  }

  @Post()
  create() {
    return this.usersService.create();
  }

  @Put(':id')
  update() {
    return this.usersService.update();
  }

  @Patch(':id')
  updateProperty() {
    return this.usersService.updateProperty();
  }

  @Delete(':id')
  remove() {
    this.usersService.remove();
  }
}
