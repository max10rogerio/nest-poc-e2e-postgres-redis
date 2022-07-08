import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { ExportServiceParams } from 'src/modules/export/services/export.service';
import { ExportQueueEnum } from '../constants';

@Injectable()
export class ExportPublisher {
  constructor(
    @InjectQueue(ExportQueueEnum.QUEUE_NAME)
    private readonly exportQueue: Queue,
  ) {}

  public async publish(params: ExportPublisherParams): Promise<Job<ExportPublisherParams>> {
    return await this.exportQueue.add(params);
  }
}

export type ExportPublisherParams = ExportServiceParams;
