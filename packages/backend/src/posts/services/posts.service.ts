import { Injectable } from '@nestjs/common';
import { FindManyPostArgs, Subset } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostDeletedResponse } from '../responses/post-deleted.response';
import { PostResponse } from '../responses/post.response';
import { PostsCountResponse } from '../responses/posts-count.response';
import { PostsResponse } from '../responses/posts.response';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(
    query?: Subset<FindManyPostArgs, FindManyPostArgs>,
  ): Promise<PostsResponse> {
    const posts = await this.prisma.post.findMany(query);

    return { data: { posts } };
  }

  async findById(id: number): Promise<PostResponse> {
    const post = await this.prisma.post.findOne({ where: { id } });

    return { data: { post } };
  }

  async count(
    query?: Pick<
      FindManyPostArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<PostsCountResponse> {
    const count = await this.prisma.post.count(query);

    return { data: { posts: { count } } };
  }

  async create(data: CreatePostDto): Promise<PostResponse> {
    const post = await this.prisma.post.create({
      data: { ...data, author: null },
    });

    return { data: { post } };
  }

  async update(id: number, data: UpdatePostDto): Promise<PostResponse> {
    const savedPost = await this.prisma.post.findOne({ where: { id } });
    const post = await this.prisma.post.update({
      where: { id },
      data: { ...savedPost, ...data },
    });

    return { data: { post } };
  }

  async updateProperty(id: number, data: PatchPostDto): Promise<PostResponse> {
    const savedPost = await this.prisma.post.findOne({ where: { id } });
    let newPost = null;

    const mustBeUpdated = Object.keys(data).reduce((needsUpdate, property) => {
      if (savedPost[property] !== data[property]) {
        if (data[property] === '' && property !== 'content') {
          return needsUpdate;
        }

        savedPost[property] = data[property];
        return true;
      }

      return needsUpdate;
    }, false);

    if (mustBeUpdated) {
      newPost = await this.prisma.post.update({
        where: { id },
        data: { ...savedPost },
      });
    }

    return { data: { post: newPost || savedPost } };
  }

  async remove(id: number): Promise<PostDeletedResponse> {
    const deleted = await this.prisma.post.delete({ where: { id } });

    return { data: { post: { deleted } } };
  }
}
