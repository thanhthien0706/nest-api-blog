import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entity/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleConvert } from './role.convert';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, RoleConvert],
  exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
