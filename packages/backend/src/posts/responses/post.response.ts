import { ApiResponse } from '../../shared/interfaces/api.response';
import { PostEntity } from '../entities/post.entity';

export class PostResponse implements ApiResponse<PostEntity> {
  data: {
    post: PostEntity;
  };
}
