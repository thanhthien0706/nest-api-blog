// import { RoleEntity } from 'src/entity/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class dbRole1674403652264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // // await queryRunner.;
    // const roleRepo = queryRunner.connection.getRepository(RoleEntity);

    // await roleRepo.insert([
    //   {
    //     name: 'ROLE_ADMIN',
    //     description: '',
    //   },
    //   {
    //     name: 'ROLE_USER',
    //     description: '',
    //   },
    // ]);

    await queryRunner.query(
      "INSERT INTO roles (name, description) VALUES ('ROLE_ADMIN',''),('ROLE_USER','')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`truncate db_roles;`);
  }
}
