import { Test, TestingModule } from '@nestjs/testing';
import { PlanEntity } from 'src/modules/database/models';
import { FindAllPlansByProductControllerResponseDTO } from 'src/modules/products/controllers/dtos';
import { FindAllPlansByProductService } from 'src/modules/products/services';
import { FindAllPlansByProductController } from '../../../../src/modules/products/controllers/find-all-plans-by-product.controller';

describe('FindAllPlansByProductController (Unit)', () => {
  let findAllPlansByProductController: FindAllPlansByProductController;
  let findAllPlansByProductService: FindAllPlansByProductService;
  let plan: PlanEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllPlansByProductController],
      providers: [
        {
          provide: FindAllPlansByProductService,
          useFactory: () => ({
            findAllPlans: jest.fn(),
          }),
        },
      ],
    }).compile();

    findAllPlansByProductController = module.get<FindAllPlansByProductController>(FindAllPlansByProductController);
    findAllPlansByProductService = module.get<FindAllPlansByProductService>(FindAllPlansByProductService);
  });

  it('should return a formated response', async () => {
    plan = new PlanEntity();
    plan.id = 1;
    plan.productId = 1;
    plan.description = 'Plan 1';
    plan.summary = 'Plan 1 is the better';
    plan.prizeValue = 9.9;

    const expected = new FindAllPlansByProductControllerResponseDTO().toDTO(plan);

    jest.spyOn(findAllPlansByProductService, 'findAllPlans').mockResolvedValue([plan]);

    await expect(findAllPlansByProductController.findAllPlansByProduct(plan.productId)).resolves.toEqual([expected]);
  });
});
