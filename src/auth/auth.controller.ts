import { Response } from 'express';

import {
  Body,
  Controller,
  HttpException,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignInDto } from '../common/form/signup.dto';
import { AuthService } from './auth.service';
import { ReponseService } from 'src/base/reponse.service';

@Controller('auth')
@UseInterceptors(FileInterceptor('avatar'))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async postSignUp(
    @Body() formSignIn: SignInDto,
    @UploadedFile() avatarFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
