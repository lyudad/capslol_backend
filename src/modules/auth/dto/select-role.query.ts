import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Role } from '../types/user.interface';

export default class SelectRole {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
