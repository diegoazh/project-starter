import { ApiResponse } from 'src/shared/interfaces/api.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfilesResponse implements ApiResponse {
  data: {
    profiles: ProfileEntity[];
  };
}
