import { ApiResponse } from 'src/shared/interfaces/api.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileResponse implements ApiResponse {
  data: {
    profile: ProfileEntity;
  };
}
