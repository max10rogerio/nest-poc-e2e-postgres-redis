import { Test, TestingModule } from '@nestjs/testing';
import { LotteryConfigEntity } from 'src/modules/database/models';
import { GetLotteryConfigsRepository, UpdateLotteryLastNumberRepository } from 'src/modules/lottery/repositories';
import { CreateLuckyNumberService } from 'src/modules/lottery/services';

describe('CreateLuckyNumberService (Unit)', () => {
  let getLotteryConfigsRepository: GetLotteryConfigsRepository;
  let updateLotteryLastNumberRepository: UpdateLotteryLastNumberRepository;
  let createLuckyNumberService: CreateLuckyNumberService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLuckyNumberService,
        {
          provide: GetLotteryConfigsRepository,
          useFactory: () => ({
            getConfigs: jest.fn(),
          }),
        },
        {
          provide: UpdateLotteryLastNumberRepository,
          useFactory: () => ({
            update: jest.fn(),
          }),
        },
      ],
    }).compile();

    getLotteryConfigsRepository = app.get<GetLotteryConfigsRepository>(GetLotteryConfigsRepository);
    updateLotteryLastNumberRepository = app.get<UpdateLotteryLastNumberRepository>(UpdateLotteryLastNumberRepository);
    createLuckyNumberService = app.get<CreateLuckyNumberService>(CreateLuckyNumberService);
  });

  it('should be create a first lucky number equals to initial number', async () => {
    const updateLotterySpy = jest
      .spyOn(updateLotteryLastNumberRepository, 'update')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(getLotteryConfigsRepository, 'getConfigs')
      .mockResolvedValue({ lastNumber: 0, initialRange: 87000 } as LotteryConfigEntity);

    const expected = 87000;

    await expect(createLuckyNumberService.createLuckyNumber()).resolves.toEqual(expected);
    expect(updateLotterySpy).toHaveBeenCalledWith(expected);
  });

  it('should be create a lucky number with next value of lastNumber (n+1)', async () => {
    const updateLotterySpy = jest
      .spyOn(updateLotteryLastNumberRepository, 'update')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(getLotteryConfigsRepository, 'getConfigs')
      .mockResolvedValue({ lastNumber: 87000, initialRange: 87000 } as LotteryConfigEntity);

    const expected = 87001;

    await expect(createLuckyNumberService.createLuckyNumber()).resolves.toEqual(expected);
    expect(updateLotterySpy).toHaveBeenCalledWith(expected);
  });
});
