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

  count(
    query?: Pick<
      FindManyPostArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.prisma.post.count(query);
  }

  create(post: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({ data: { ...post, author: null } });
  }

  async update(id: number, post: UpdatePostDto): Promise<Post> {
    const savedPost = await this.prisma.post.findOne({ where: { id } });
    const { title, content, type, published } = post;

    savedPost.title = title;
    savedPost.content = content;
    savedPost.type = type;
    savedPost.published = published;

    return this.prisma.post.update({ where: { id }, data: { ...savedPost } });
  }

  async updateProperty(id: number, post: PatchPostDto): Promise<Post> {
    const savedPost = await this.prisma.post.findOne({ where: { id } });
    const { title, content, type, published } = post;

    savedPost.title = title || savedPost.title;
    savedPost.content = content || savedPost.content;
    savedPost.type = type || savedPost.type;
    savedPost.published = published || savedPost.published;

    return this.prisma.post.update({ where: { id }, data: { ...savedPost } });
  }

  remove(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
