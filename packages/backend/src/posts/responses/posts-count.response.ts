import { ApiResponse } from '../../shared/interfaces/api.response';

export class PostsCountResponse implements ApiResponse {
  data: {
    posts: {
      count: number;
    };
  };
}
