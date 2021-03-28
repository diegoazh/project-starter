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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindManyPostArgs, Subset } from 'prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostDeletedResponse } from '../responses/post-deleted.response';
import { PostResponse } from '../responses/post.response';
import { PostsCountResponse } from '../responses/posts-count.response';
import { PostsResponse } from '../responses/posts.response';
import { PostsService } from '../services/posts.service';

@ApiTags('Posts controller')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async find(
    @Query() query?: Subset<FindManyPostArgs, FindManyPostArgs>,
  ): Promise<PostsResponse> {
    const posts = await this.postsService.find(query);

    return { data: { posts } };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PostResponse> {
    const post = await this.postsService.findById(id);

    return { data: { post } };
  }

  @Get('count')
  async count(
    @Query()
    query: Pick<
      FindManyPostArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<PostsCountResponse> {
    const count = await this.postsService.count(query);

    return { data: { posts: { count } } };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: CreatePostDto): Promise<PostResponse> {
    const newPost = await this.postsService.create(post);

    return { data: { post: newPost } };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
  ): Promise<PostResponse> {
    const updatedPost = await this.postsService.update(id, post);

    return { data: { post: updatedPost } };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProperty(
    @Param('id') id: string,
    post: PatchPostDto,
  ): Promise<PostResponse> {
    const updatedPost = await this.postsService.updateProperty(id, post);

    return { data: { post: updatedPost } };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostDeletedResponse> {
    const deleted = await this.postsService.remove(id);

    return { data: { post: { deleted } } };
  }
}
