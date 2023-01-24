import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CloudinaryModule } from 'src/providers/strorage/cloudinary.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/roles/role.module';

@Module({
  imports: [CloudinaryModule, UserModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
