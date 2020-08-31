import { ApiResponse } from 'src/shared/interfaces/api.response';

export class ProfilesCountResponse implements ApiResponse {
  data: {
    profiles: {
      count: number;
    };
  };
}
