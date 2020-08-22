import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  find() {
    return this.prisma.post.findMany();
  }

  findById() {
    return this.prisma.post.findOne();
  }

  count() {
    return this.prisma.post.count();
  }

  create() {
    return this.prisma.post.create();
  }

  update() {
    return this.prisma.post.update();
  }

  updateProperty() {
    return this.prisma.post.update();
  }

  remove() {
    return this.prisma.post.delete();
  }
}
