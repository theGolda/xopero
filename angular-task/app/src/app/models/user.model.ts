export interface UserModel {
  id: number;
  name: string;
  role: string;
  email: string;
  protectedProjects: number;
  isFavorite: boolean;
}
