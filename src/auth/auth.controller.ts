import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getTest(): string {
    console.log(this.configService.get<string>('DATABASE.TYPE'));
    return 'Hello';
  }
}
