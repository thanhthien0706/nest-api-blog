import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CloudinaryModule } from 'src/providers/strorage/cloudinary.module';
import { ReponseService } from 'src/base/reponse.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
