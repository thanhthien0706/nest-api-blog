import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/entity/role.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
