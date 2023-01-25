import { IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class RoleDto extends BaseDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;
}
