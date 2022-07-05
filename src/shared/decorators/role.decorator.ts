import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/auth/types/user.interface';

export const ROLES_KEY = 'roles';
const Roles = (...roles: Role[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);

export default Roles;
