import UserEntity from '../entity/user.entity';

export type UserType = Omit<UserEntity, 'password'>;

export interface IUserResponse {
  user: UserType | UserType[];
  token?: string;
  message: string;
}
