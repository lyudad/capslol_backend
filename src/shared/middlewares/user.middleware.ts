import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    if (!authorization) {
      req.user = null;
      next();
      return;
    }

    const token = authorization.split(' ')[1];
    const secret = this.configService.get('JWT_SECRET');
    try {
      const decode = this.jwtService.verify(token, { secret });
      req.user = decode;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
