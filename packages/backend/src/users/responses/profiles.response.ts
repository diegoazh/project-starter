import { ApiResponse } from '../../shared/interfaces/api.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfilesResponse implements ApiResponse<ProfileEntity[]> {
  data: {
    profiles: ProfileEntity[];
  };
}
