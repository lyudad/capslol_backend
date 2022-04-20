import { Body, Controller, Get, Post } from '@nestjs/common';
import AuthServive from './auth.service';
import CreateUserDto from './dto/create-user.dto';

@Controller('auth')
export default class AuthController {
    constructor(private readonly authService: AuthServive) { }

    @Get('allusers')
    async allUser() {
        const users = await this.authService.allUsers();
        return users
    }

    @Post('createUser')
    async createUser(@Body('user') user: CreateUserDto) {
        return this.authService.createUser(user)
    }
}
