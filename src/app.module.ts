import { Module } from '@nestjs/common';
import { MysqlModule } from './config/mysql.module';
import { EnvModule } from './config/env.module';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';

@Module({
  imports: [MysqlModule, EnvModule, AuthModule, BaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
