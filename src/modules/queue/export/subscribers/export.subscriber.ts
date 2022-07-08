import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ExportService, ExportServiceParams } from 'src/modules/export/services/export.service';
import { ExportQueueEnum } from '../constants';

@Processor(ExportQueueEnum.QUEUE_NAME)
export class ExportSubscriber {
  constructor(private readonly exportService: ExportService) {}

  @Process()
  public async subscribe(job: Job<ExportSubscriberParams>) {
    await this.exportService.export(job.data);
  }
}

export type ExportSubscriberParams = ExportServiceParams;
