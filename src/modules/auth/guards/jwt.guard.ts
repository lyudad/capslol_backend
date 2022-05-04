import { AuthGuard } from '@nestjs/passport';

export default class JWTGuard extends AuthGuard('jwt') {}
