export interface ApiResponse<T> {
  links?: {
    self: string;
    prev?: string;
    next?: string;
    last?: string;
  };

  data: T;

  errors?: any[];
}
