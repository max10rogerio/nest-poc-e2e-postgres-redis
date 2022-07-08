import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExportModule } from 'src/modules/export/export.module';
import { ExportQueueEnum } from './constants';
import { ExportPublisher } from './publishers';
import { ExportSubscriber } from './subscribers';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ExportQueueEnum.QUEUE_NAME,
    }),
    ExportModule,
  ],
  providers: [ExportPublisher, ExportSubscriber],
  exports: [ExportPublisher],
})
export class ExportQueueModule {}
