import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { ExportService } from 'src/modules/export/services/export.service';
import { ExportQueueModule } from 'src/modules/queue/export';
import { ExportSubscriber } from 'src/modules/queue/export/subscribers';

describe('ExportSubscriber - unit', () => {
  let app: TestingModule;
  let exportSubscriber: ExportSubscriber;
  let exportService: ExportService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ExportQueueModule, DatabaseModule],
    }).compile();

    exportSubscriber = app.get<ExportSubscriber>(ExportSubscriber);
    exportService = app.get<ExportService>(ExportService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a export in queue', async () => {
    jest.spyOn(exportService, 'export').mockImplementation(() => Promise.resolve(undefined));

    const job: Job = { id: '1', data: { type: ExportTypeEnum.DIH } } as Job;
    await exportSubscriber.subscribe(job);

    expect(exportService.export).toHaveBeenCalledWith(job.data);
  });
});
