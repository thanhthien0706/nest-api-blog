import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleEntity } from 'src/entity/role.entity';

export class SignUpForm {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  avatar: string | null;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  roles: string | null;
}
