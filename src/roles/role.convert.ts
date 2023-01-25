import { Injectable } from '@nestjs/common';
import { RoleDto } from 'src/common/dto/role.dto';
import { RoleEntity } from 'src/entity/role.entity';

@Injectable()
export class RoleConvert {
  public toDto(eRole: RoleEntity): RoleDto {
    const dto: RoleDto = { ...eRole };

    return dto;
  }
}
