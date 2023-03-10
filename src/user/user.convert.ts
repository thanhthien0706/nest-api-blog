import { Injectable } from '@nestjs/common';
import e from 'express';
import { UserDto } from 'src/common/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';

@Injectable()
export class UserConvert {
  public toDto(eUser: UserEntity): UserDto {
    const dto: UserDto = {
      fullName: eUser.fullName,
      avatar: eUser.avatar,
      email: eUser.email,
      isActive: eUser.isActive,
      id: eUser.id,
      updatedAt: eUser.updatedAt,
      createdAt: eUser.createdAt,
      deletedAt: eUser.deletedAt,
    };

    const roles: string[] = [];

    eUser.roles.forEach((role) => {
      roles.push(role.name);
    });

    dto.roles = roles;

    return dto;
  }
}
