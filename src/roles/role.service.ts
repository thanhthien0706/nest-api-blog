import { ConflictException, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from 'src/entity/role.entity';
import { RoleConvert } from './role.convert';
import { RoleDto } from 'src/common/dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly roleConvert: RoleConvert,
  ) {}

  async existRole(nameRole: string): Promise<boolean> {
    const checkRole = await this.roleRepository.exist({
      where: { name: nameRole },
    });

    return checkRole;
  }

  async findRoleByName(nameRole: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ name: nameRole });

    if (!role) {
      throw new ConflictException(`Role ${nameRole} not existed`);
    }

    return role;
  }
}
