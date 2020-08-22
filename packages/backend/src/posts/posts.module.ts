import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';

@Module({
  imports: [SharedModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
