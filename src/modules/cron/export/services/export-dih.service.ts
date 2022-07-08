import { Injectable } from '@nestjs/common';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { ExportPublisher } from 'src/modules/queue/export';

@Injectable()
export class ExportDihService {
  constructor(private readonly exportPublisher: ExportPublisher) {}

  public name = 'ExportDihService';

  async publish() {
    return await this.exportPublisher.publish({
      type: ExportTypeEnum.DIH,
    });
  }
}
