import { Test, TestingModule } from '@nestjs/testing';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { CancelPolicyController } from 'src/modules/policy/controllers';
import { CancelPolicyService, CancelPolicyServiceResponse } from 'src/modules/policy/services';

describe('CancelPolicyController - Unit', () => {
  let cancelPolicyController: CancelPolicyController;
  let cancelPolicyService: CancelPolicyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CancelPolicyController,
        {
          provide: CancelPolicyService,
          useFactory: () => ({
            cancelPolicy: jest.fn(),
          }),
        },
      ],
    }).compile();

    cancelPolicyController = app.get<CancelPolicyController>(CancelPolicyController);
    cancelPolicyService = app.get<CancelPolicyService>(CancelPolicyService);
  });

  it('Should cancel policy', async () => {
    const expected: CancelPolicyServiceResponse = {
      id: 1,
      status: PolicyStatusEnum.CANCELLED,
      cancellationDate: new Date(),
      coverageEndDate: new Date(),
    };

    jest.spyOn(cancelPolicyService, 'cancelPolicy').mockResolvedValue(expected);
    await expect(cancelPolicyController.cancelPolicy({ id: 1 })).resolves.toBe(expected);
  });
});
