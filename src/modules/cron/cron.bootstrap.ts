import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Env } from 'src/config';
import { ExportDihService, ExportReService } from './export/services';

@Injectable()
export class CronBootstrap implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly exportDihService: ExportDihService,
    private readonly exportReService: ExportReService,
  ) {}

  onApplicationBootstrap() {
    const cron = this.configService.get<Env['cron']>('cron');

    this.createExportDihService(cron.exportDihService);
    this.createExportReService(cron.exportReService);
  }

  private createExportDihService(cronExpression: string) {
    const jobExportDih = new CronJob(cronExpression, () => this.exportDihService.publish());
    this.schedulerRegistry.addCronJob(this.exportDihService.name, jobExportDih);
    jobExportDih.start();
  }

  private createExportReService(cronExpression: string) {
    const jobExportRe = new CronJob(cronExpression, () => this.exportReService.publish());
    this.schedulerRegistry.addCronJob(this.exportReService.name, jobExportRe);
    jobExportRe.start();
  }
}
