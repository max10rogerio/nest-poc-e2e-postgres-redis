import { Test, TestingModule } from '@nestjs/testing';
import { CronModule } from 'src/modules/cron/cron.module';
import { ExportReService } from 'src/modules/cron/export/services';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { ExportPublisher } from 'src/modules/queue/export';

describe('ExportReService - unit', () => {
  let app: TestingModule;
  let exportReService: ExportReService;
  let exportPublisher: ExportPublisher;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [CronModule],
    }).compile();

    exportReService = app.get<ExportReService>(ExportReService);
    exportPublisher = app.get<ExportPublisher>(ExportPublisher);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a export in queue', async () => {
    jest.spyOn(exportPublisher, 'publish').mockImplementation(() => Promise.resolve(undefined));

    const paramsMock = { type: ExportTypeEnum.RE };
    await exportReService.publish();

    expect(exportPublisher.publish).toHaveBeenCalledTimes(1);
    expect(exportPublisher.publish).toHaveBeenCalledWith(paramsMock);
  });
});
