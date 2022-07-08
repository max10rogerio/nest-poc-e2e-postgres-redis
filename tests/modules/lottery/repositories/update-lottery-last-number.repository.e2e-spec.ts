import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { LotteryModule } from 'src/modules/lottery/loterry.module';
import { UpdateLotteryLastNumberRepository } from 'src/modules/lottery/repositories';
import { UpdateLotteryLastNumberRepositorySeeder } from './__mocks__/update-lottery-last-number.repository.mock';

describe('[Repository] UpdateLotteryLastNumberRepository (e2e)', () => {
  let app: INestApplication;
  let updateLotteryLastNumberRepository: UpdateLotteryLastNumberRepository;
  let seeder: UpdateLotteryLastNumberRepositorySeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LotteryModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    updateLotteryLastNumberRepository = app.get<UpdateLotteryLastNumberRepository>(UpdateLotteryLastNumberRepository);

    seeder = new UpdateLotteryLastNumberRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should update last lucker number created', async () => {
    const lastNumber = 87123;

    await seeder.seed(lastNumber);

    await updateLotteryLastNumberRepository.update(lastNumber);

    const { lastNumber: lastNumberSaved } = await seeder.lotteryRepository.findOne();

    expect(lastNumberSaved).toEqual(lastNumber);
  });
});
