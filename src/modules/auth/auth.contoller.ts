import { Controller, Get } from '@nestjs/common';
import AuthServive from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthServive) {}

  @Get('allusers')
  async allUser() {
    return this.authService.allUsers();
  }

  // @Post('createUser')
  // async createUser() {
  //     return awa'createUser'
  // }
}
