import { UserModel } from './user.model';

export interface ApiResponse<T> {
  results: T[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface UsersApiResponse extends ApiResponse<UserModel> {}
