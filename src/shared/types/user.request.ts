// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { UserType } from 'src/modules/auth/types/user.interface';

export interface UserRequest extends Request {
  user?: UserType;
}
