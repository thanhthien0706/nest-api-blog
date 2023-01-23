import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  fullName?: string;

  @IsDefined()
  @IsString()
  avatar?: string | null;

  @IsEmail()
  email?: string;

  @IsBoolean()
  isActive?: boolean;

  roles?: string[];
}
