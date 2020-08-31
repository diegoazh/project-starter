import { ApiResponse } from 'src/shared/interfaces/api.response';
import { PostEntity } from '../entities/post.entity';

export class PostDeletedResponse implements ApiResponse {
  data: {
    post: {
      deleted: PostEntity;
    };
  };
}
