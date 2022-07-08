import { Test, TestingModule } from '@nestjs/testing';
import { PlanNotFound } from 'src/errors';
import { FindPlanDetailsByIdRepository } from 'src/modules/plans/repositories';
import { FindPlanDetailsByIdService } from 'src/modules/plans/services';
import { expected } from './__mocks__/find-plan-details-by-id.service.mock';

describe('FindPlanDetailsByIdService (Unit)', () => {
  let findPlanDetailsByIdService: FindPlanDetailsByIdService;
  let findPlanDetailsByIdRepository: FindPlanDetailsByIdRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindPlanDetailsByIdService,
        {
          provide: FindPlanDetailsByIdRepository,
          useFactory: () => ({
            findById: jest.fn(),
          }),
        },
      ],
    }).compile();

    findPlanDetailsByIdRepository = app.get<FindPlanDetailsByIdRepository>(FindPlanDetailsByIdRepository);
    findPlanDetailsByIdService = app.get<FindPlanDetailsByIdService>(FindPlanDetailsByIdService);
  });

  it('should return PlanNotFound error', async () => {
    jest.spyOn(findPlanDetailsByIdRepository, 'findById').mockResolvedValue(null);

    await expect(findPlanDetailsByIdService.findById(1)).rejects.toThrow(new PlanNotFound(1));
  });

  it('should return PlanEntity object', async () => {
    jest.spyOn(findPlanDetailsByIdRepository, 'findById').mockResolvedValue(expected as any);

    await expect(findPlanDetailsByIdService.findById(1)).resolves.toEqual(expected);
  });
});
