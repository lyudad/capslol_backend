import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return (
      'Hello World!' + ` ${this.configService.get<string>('WELCOME_MESSAGE')}`
    );
  }
}
