import { IsDateString, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleForm {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string | null;
}
