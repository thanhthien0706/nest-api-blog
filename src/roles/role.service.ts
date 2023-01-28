import { ConflictException, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from 'src/entity/role.entity';
import { CreateRoleForm } from '../common/form/CreateRole.form';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

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

  async createRole(roleForm: CreateRoleForm): Promise<RoleEntity> {
    const checkRole = await this.existRole(roleForm.name);
    if (checkRole) {
      throw new ConflictException(`${roleForm.name} existed`);
    }

    const role = await this.roleRepository.save(roleForm);

    if (!role) {
      throw new ConflictException(`Not Create Role: ${roleForm.name}`);
    }

    return role;
  }
}
