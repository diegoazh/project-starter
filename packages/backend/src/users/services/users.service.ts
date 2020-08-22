import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  find() {
    return this.prisma.user.findMany();
  }

  findById() {
    return this.prisma.user.findOne();
  }

  count() {
    return this.prisma.user.count();
  }

  create() {
    return this.prisma.user.create();
  }

  update() {
    return this.prisma.user.update();
  }

  updateProperty() {
    return this.prisma.user.update();
  }

  remove() {
    return this.prisma.user.delete();
  }
}
