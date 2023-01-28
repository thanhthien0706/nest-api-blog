import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SignInForm {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
