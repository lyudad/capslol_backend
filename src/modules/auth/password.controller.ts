import {
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import User from './decorators/user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { IUser } from './interfaces/user.interface';
import PasswordService from './password.service';

@ApiTags('Reset Password')
@Controller('password')
export default class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @ApiBody({ type: ForgotPasswordDto })
  @Post('forgotPassword')
  @UsePipes(new ValidationPipe())
  async sendConfirmation(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<string> {
    return this.passwordService.forgotPassword(forgotPasswordDto);
  }

  @ApiBody({ type: ChangePasswordDto })
  @Patch('changePassword')
  @UsePipes(new ValidationPipe())
  async changePassword(
    @User() user: IUser,
    @Body('user')
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.passwordService.changePassword(user.id, changePasswordDto);
  }
}
