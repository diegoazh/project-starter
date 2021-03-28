import { ApiResponse } from '../../shared/interfaces/api.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileDeletedResponse
  implements ApiResponse<{ deleted: ProfileEntity }> {
  data: {
    profile: {
      deleted: ProfileEntity;
    };
  };
}
