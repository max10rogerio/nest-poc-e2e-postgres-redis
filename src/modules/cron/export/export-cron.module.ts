import { Module } from '@nestjs/common';
import { ExportQueueModule } from 'src/modules/queue/export';
import { ExportDihService, ExportReService } from './services';

@Module({
  imports: [ExportQueueModule],
  providers: [ExportDihService, ExportReService],
  exports: [ExportDihService, ExportReService],
})
export class ExportCronModule {}
