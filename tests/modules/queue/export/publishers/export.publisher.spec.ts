import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { Job, Queue } from 'bull';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { ExportPublisher, ExportQueueModule } from 'src/modules/queue/export';
import { ExportQueueEnum } from 'src/modules/queue/export/constants';

describe('ExportPublisher - unit', () => {
  let exportPublisher: ExportPublisher;
  let app: TestingModule;
  let queue: Queue;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ExportQueueModule, DatabaseModule],
    }).compile();

    exportPublisher = app.get<ExportPublisher>(ExportPublisher);
    queue = app.get<Queue>(getQueueToken(ExportQueueEnum.QUEUE_NAME));
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a export in queue', async () => {
    jest.spyOn(queue, 'add').mockImplementation(() => Promise.resolve({ id: 1 } as Job));

    const paramsMock = { type: ExportTypeEnum.DIH };
    await exportPublisher.publish(paramsMock);

    expect(queue.add).toHaveBeenCalledTimes(1);
    expect(queue.add).toHaveBeenCalledWith(paramsMock);
  });
});
