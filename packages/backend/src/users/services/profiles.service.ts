import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  find() {
    return this.prisma.profile.findMany();
  }

  findById() {
    return this.prisma.profile.findOne();
  }

  count() {
    return this.prisma.profile.count();
  }

  create() {
    return this.prisma.profile.create();
  }

  update() {
    return this.prisma.profile.update();
  }

  updateProperty() {
    return this.prisma.profile.update();
  }

  remove() {
    return this.prisma.profile.delete();
  }
}
