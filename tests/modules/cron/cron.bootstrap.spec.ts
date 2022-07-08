import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { CronJob } from 'cron';
import { CronBootstrap } from 'src/modules/cron/cron.bootstrap';
import { CronModule } from 'src/modules/cron/cron.module';
import { ExportDihService, ExportReService } from 'src/modules/cron/export/services';

describe('Cron-OnApplicationBootstrap - Unit', () => {
  let app: TestingModule;
  let cronOnApplicationBootstrap: CronBootstrap;
  let exportDihService: ExportDihService;
  let schedulerRegistry: SchedulerRegistry;
  let exportReService: ExportReService;

  beforeEach(async () => {
    process.env.CRON_EXPORT_DIH = CronExpression.EVERY_HOUR;
    process.env.CRON_EXPORT_RE = CronExpression.EVERY_HOUR;
    app = await Test.createTestingModule({
      imports: [CronModule],
    }).compile();

    cronOnApplicationBootstrap = app.get<CronBootstrap>(CronBootstrap);
    exportDihService = app.get<ExportDihService>(ExportDihService);
    exportReService = app.get<ExportReService>(ExportReService);
    schedulerRegistry = app.get<SchedulerRegistry>(SchedulerRegistry);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be start cronJob dynamic', async () => {
    jest.spyOn(schedulerRegistry, 'addCronJob').mockImplementation(() => Promise.resolve(undefined));
    jest.spyOn(exportDihService, 'publish').mockImplementation(() => Promise.resolve(undefined));
    jest.spyOn(exportReService, 'publish').mockImplementation(() => Promise.resolve(undefined));
    jest.spyOn(CronJob.prototype, 'start').mockImplementation();

    const schedulerSpy = jest.spyOn(schedulerRegistry, 'addCronJob');

    expect(cronOnApplicationBootstrap.onApplicationBootstrap()).toBeUndefined();

    expect(schedulerSpy).toBeCalledTimes(2);
  });
});
