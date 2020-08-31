export interface ApiResponse {
  links?: {
    self: string;
    prev?: string;
    next?: string;
    last?: string;
  };

  data: any; // TODO: this should be entity, entity[] or count or deleted interfaces.

  errors?: any[];
}
