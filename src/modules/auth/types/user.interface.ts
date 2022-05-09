import UserEntity from '../entity/user.entity';

export type UserType = Omit<UserEntity, 'password' | 'hashedPassword'>;
export interface IUserResponse {
  user: UserType;
  accessToken?: string;
  refreshToken?: string;
}
