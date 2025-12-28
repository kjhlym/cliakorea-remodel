import { Module } from '@nestjs/common';
import { R2Service } from './r2.service';
import { FilesController } from './files.controller';

@Module({
  providers: [R2Service],
  controllers: [FilesController],
  exports: [R2Service],
})
export class FilesModule {}
