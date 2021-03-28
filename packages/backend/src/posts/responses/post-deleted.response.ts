import { ApiResponse } from '../../shared/interfaces/api.response';
import { PostEntity } from '../entities/post.entity';

export class PostDeletedResponse
  implements ApiResponse<{ deleted: PostEntity }> {
  data: {
    post: {
      deleted: PostEntity;
    };
  };
}
