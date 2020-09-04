import { ApiResponse } from '../../shared/interfaces/api.response';

export class UsersCountResponse implements ApiResponse {
  data: {
    users: {
      count: number;
    };
  };
}
