import { Test, TestingModule } from '@nestjs/testing';
import { CreateInstallmentRepository } from 'src/modules/policy/repositories';
import { CreateInstallmentService } from 'src/modules/policy/services';
import { createInstallmentParams, createInstallmentResponse } from './__mocks__/create-installment.service.mock';

describe('CreateInstallmentService (Unit)', () => {
  let createInstallmentService: CreateInstallmentService;
  let createInstallmentRepository: CreateInstallmentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInstallmentService,
        {
          provide: CreateInstallmentRepository,
          useFactory: () => ({
            createInstallment: jest.fn(),
          }),
        },
      ],
    }).compile();

    createInstallmentRepository = app.get<CreateInstallmentRepository>(CreateInstallmentRepository);
    createInstallmentService = app.get<CreateInstallmentService>(CreateInstallmentService);
  });

  it('should be create an installment and returns this', async () => {
    const response = createInstallmentResponse();

    jest.spyOn(createInstallmentRepository, 'createInstallment').mockImplementation(() => Promise.resolve(response[0]));

    await expect(createInstallmentService.createInstallment(createInstallmentParams())).resolves.toEqual(response);
    await expect(createInstallmentService.createInstallment(createInstallmentParams()[0])).resolves.toEqual(response);
  });
});
