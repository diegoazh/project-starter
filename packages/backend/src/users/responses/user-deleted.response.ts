import { ApiResponse } from '../../shared/interfaces/api.response';
import { UserEntity } from '../entities/user.entity';

export class UserDeletedResponse
  implements ApiResponse<{ deleted: UserEntity }> {
  data: {
    user: {
      deleted: UserEntity;
    };
  };
}
