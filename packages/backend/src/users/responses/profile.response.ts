import { ApiResponse } from '../../shared/interfaces/api.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileResponse implements ApiResponse<ProfileEntity> {
  data: {
    profile: ProfileEntity;
  };
}
