import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BaseDto } from './base.dto';

export class UserDto extends BaseDto {
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
