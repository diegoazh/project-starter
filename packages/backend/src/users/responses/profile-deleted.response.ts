import { ApiResponse } from 'src/shared/interfaces/api.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileDeletedResponse implements ApiResponse {
  data: {
    profile: {
      deleted: ProfileEntity;
    };
  };
}
