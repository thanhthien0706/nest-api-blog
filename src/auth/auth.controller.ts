import { Response } from 'express';

import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { ReponseService } from 'src/base/reponse.service';
import { SignUpForm } from 'src/common/form/signup.form';

@Controller('auth')
@UseInterceptors(FileInterceptor('avatar'))
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly reponseService: ReponseService,
  ) {}

  @Post('signup')
  async postSignUp(
    @Body() formSignIn: SignUpForm,
    @UploadedFile() avatarFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.signupHandler(formSignIn, avatarFile);

      return res
        .status(HttpStatus.OK)
        .json(
          this.reponseService.customResponeHttp(
            true,
            'Signup Successful',
            user,
          ),
        );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
