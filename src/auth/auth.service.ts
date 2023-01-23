import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/providers/strorage/cloudinary.service';
import { SignUpDto } from '../common/form/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  signupHandler(formSignIn: SignUpDto, avatarFile: Express.Multer.File) {}
}
