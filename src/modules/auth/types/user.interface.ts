import UserEntity from '../entity/user.entity';

export type UserType = Omit<UserEntity, 'password' | 'hashedPassword'>;
export interface IUserResponse {
  user: UserType;
  accessToken?: string;
  refreshToken?: string;
}

export enum Role {
  FREELANCER = 'Freelancer',
  JOB_OWNER = 'Job Owner',
  NOSET = 'No set',
}
