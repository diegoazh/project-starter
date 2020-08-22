import { Controller } from '@nestjs/common';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  find() {
    return this.postsService.find();
  }

  @Get(':id')
  findById() {
    return this.postsService.findById();
  }

  @Get('count')
  count() {
    return this.postsService.count();
  }

  @Post()
  create() {
    return this.postsService.create();
  }

  @Put(':id')
  update() {
    return this.postsService.update();
  }

  @Patch(':id')
  updateProperty() {
    return this.postsService.updateProperty();
  }

  @Delete(':id')
  remove() {
    this.postsService.remove();
  }
}
