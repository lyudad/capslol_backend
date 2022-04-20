import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import AppService from './app.service';

@ApiTags('Greeting')
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Hello World! You are beautiful!',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
