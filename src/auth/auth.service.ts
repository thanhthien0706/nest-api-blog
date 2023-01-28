import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from 'src/common/dto/Signup.dto';
import { SignUpForm } from 'src/common/form/signup.form';
import { CloudinaryService } from 'src/providers/strorage/cloudinary.service';
import { RoleService } from 'src/roles/role.service';
import { UserService } from 'src/user/user.service';
import * as bcryt from 'bcrypt';
import { SignInForm } from 'src/common/form/signinform';
import { UserEntity } from 'src/entity/user.entity';
import { AuthPayload } from './interface/auth-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcryt.hash(password, 10);
  }

  async comparePassword(password: string, hashPass: string): Promise<boolean> {
    return await bcryt.compare(password, hashPass);
  }

  async signupHandler(formSignIn: SignUpForm, avatarFile: Express.Multer.File) {
    const emailExist = await this.userService.checkExistByEmail(
      formSignIn.email,
    );

    if (emailExist) {
      throw new ConflictException(`${formSignIn.email} existed`);
    }

    const signUpDto: SignUpDto = {
      fullName: formSignIn.fullName,
      email: formSignIn.email,
      password: await this.hashPassword(formSignIn.password),
      roles: [],
      isActive: true,
    };

    if (formSignIn.roles) {
      const roles = formSignIn.roles.split(',');
      for (const role of roles) {
        signUpDto.roles.push(
          await this.roleService.findRoleByName(role.trim()),
        );
      }
    } else {
      const role = await this.roleService.findRoleByName('ROLE_USER');
      signUpDto.roles.push(role);
    }

    if (!avatarFile) {
      throw new ConflictException(`Need file avatar`);
    }

    const avatarUpload = await this.cloudinaryService.uploadFileBuffer(
      avatarFile,
    );

    if (!avatarUpload) {
      throw new ConflictException(`Upload avatar failed`);
    }

    signUpDto.avatar = avatarUpload.url;

    const user = await this.userService.createUser(signUpDto);

    return user;
  }

  async validateUser(formSignin: SignInForm): Promise<any> {
    const user = await this.userService.getUserByEmail(formSignin.email);
    const checkPass = await this.comparePassword(
      formSignin.password,
      user.password,
    );

    if (!user || !checkPass) {
      throw new BadRequestException('Validation user failed');
    }

    return user;
  }

  async login(user: UserEntity): Promise<string> {
    const payload: AuthPayload = { id: user.id };

    return await this.jwtService.sign(payload);
  }
}
