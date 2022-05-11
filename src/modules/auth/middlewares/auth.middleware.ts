import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextFunction, Request, Response } from 'express';
import AuthServive from '../auth.service';
import { RESPONSE_MESSAGE } from '../constants/auth.constants';

@Injectable()
export default class AuthMiddlerware implements NestMiddleware {
  constructor(private readonly authService: AuthServive) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user: { email },
      } = req.body;
      if (email) {
        const isGoogleAccount = await this.authService.hasUserGoogleAccount(
          email,
        );
        if (isGoogleAccount) {
          throw new HttpException(
            {
              status: 401,
              message: RESPONSE_MESSAGE.HAS_GOOGLE_ACCOUNT,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }

      next();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
