import { Injectable } from '@nestjs/common';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { ExportPublisher } from 'src/modules/queue/export';

@Injectable()
export class ExportReService {
  constructor(private readonly exportPublisher: ExportPublisher) {}

  public name = 'ExportReService';

  async publish() {
    return await this.exportPublisher.publish({
      type: ExportTypeEnum.RE,
    });
  }
}
