import { Module } from '@nestjs/common';
import { UtilsService } from './util.service';

@Module({
  controllers: [],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
