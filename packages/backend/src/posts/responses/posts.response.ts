import { ApiResponse } from '../../shared/interfaces/api.response';
import { PostEntity } from '../entities/post.entity';

export class PostsResponse implements ApiResponse {
  data: {
    posts: PostEntity[];
  };
}
