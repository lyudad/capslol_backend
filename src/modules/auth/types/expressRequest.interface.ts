// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { GoogleUserType } from './google.type';

export interface ExpressRequest extends Request {
  user?: GoogleUserType;
}
