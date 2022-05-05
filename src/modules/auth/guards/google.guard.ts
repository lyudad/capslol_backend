import { AuthGuard } from '@nestjs/passport';

export default class GoogleGuard extends AuthGuard('google') {}
