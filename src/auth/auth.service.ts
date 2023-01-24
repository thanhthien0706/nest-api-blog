import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/common/dto/Signup.dto';
import { SignUpForm } from 'src/common/form/signup.form';
import { CloudinaryService } from 'src/providers/strorage/cloudinary.service';
import { RoleService } from 'src/roles/role.service';
import { UserService } from 'src/user/user.service';
import * as bcryt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

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
      password: (await bcryt.hash(formSignIn.password, 10)) as string,
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
}
