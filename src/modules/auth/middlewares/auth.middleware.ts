import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextFunction, Request, Response } from 'express';
import AuthServive from '../auth.service';

@Injectable()
export default class AuthMiddlerware implements NestMiddleware {
  constructor(private readonly authService: AuthServive) {}

  async use(req: Request, res: Response, next: NextFunction) {
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
            message:
              'User has google account. Please use Google Sign In button',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    next();
  }
}
