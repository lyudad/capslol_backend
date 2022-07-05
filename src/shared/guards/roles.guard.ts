import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/modules/auth/types/user.interface';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UserRequest } from '../types/user.request';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<UserRequest>();

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    return roles.some((role) => user.role?.includes(role));
  }
}
