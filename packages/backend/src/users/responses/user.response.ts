import { ApiResponse } from '../../shared/interfaces/api.response';
import { UserEntity } from '../entities/user.entity';

export class UserResponse implements ApiResponse<UserEntity> {
  data: {
    user: UserEntity;
  };
}
