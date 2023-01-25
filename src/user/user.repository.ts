import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async existByEmail(email: string): Promise<boolean> {
    return await this.exist({
      where: { email },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }
}
