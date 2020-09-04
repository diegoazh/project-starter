import { Injectable } from '@nestjs/common';
import { FindManyPostArgs, Post, Subset } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  find(query?: Subset<FindManyPostArgs, FindManyPostArgs>): Promise<Post[]> {
    return this.prisma.post.findMany(query);
  }

  findById(id: number): Promise<Post> {
    return this.prisma.post.findOne({ where: { id } });
  }

  async count(
    query?: Pick<
      FindManyPostArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.prisma.post.count(query);
  }

  create(data: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: { ...data, author: null },
    });
  }

  async update(id: number, data: UpdatePostDto): Promise<Post> {
    const savedPost = await this.prisma.post.findOne({ where: { id } });

    return this.prisma.post.update({
      where: { id },
      data: { ...savedPost, ...data },
    });
  }

  async updateProperty(id: number, post: PatchPostDto): Promise<Post> {
    const savedPost = await this.prisma.post.findOne({ where: { id } });

    const mustBeUpdated = Object.keys(post).reduce((needsUpdate, property) => {
      if (savedPost[property] !== post[property]) {
        if (post[property] === '' && property !== 'content') {
          return needsUpdate;
        }

        savedPost[property] = post[property];
        return true;
      }

      return needsUpdate;
    }, false);

    if (mustBeUpdated) {
      return this.prisma.post.update({
        where: { id },
        data: { ...savedPost },
      });
    }

    return savedPost;
  }

  async remove(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
