import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfiguration from './env.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      isGlobal: true,
    }),
  ],
})
export class EnvModule {}
