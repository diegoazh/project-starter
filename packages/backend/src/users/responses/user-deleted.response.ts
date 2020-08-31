import { ApiResponse } from 'src/shared/interfaces/api.response';
import { UserEntity } from '../entities/user.entity';

export class UserDeletedResponse implements ApiResponse {
  data: {
    user: {
      deleted: UserEntity;
    };
  };
}
