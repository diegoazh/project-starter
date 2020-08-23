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
import { FindManyPostArgs, Subset } from '@prisma/client';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostResponse } from '../responses/post.response';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  find(
    @Query() query?: Subset<FindManyPostArgs, FindManyPostArgs>,
  ): Promise<PostResponse[]> {
    return this.postsService.find(query);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<PostResponse> {
    return this.postsService.findById(id);
  }

  @Get('count')
  count(
    @Query()
    query: Pick<
      FindManyPostArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.postsService.count(query);
  }

  @Post()
  create(@Body() post: CreatePostDto): Promise<PostResponse> {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: UpdatePostDto,
  ): Promise<PostResponse> {
    return this.postsService.update(id, post);
  }

  @Patch(':id')
  updateProperty(
    @Param('id') id: number,
    post: PatchPostDto,
  ): Promise<PostResponse> {
    return this.postsService.updateProperty(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<PostResponse> {
    return this.postsService.remove(id);
  }
}
