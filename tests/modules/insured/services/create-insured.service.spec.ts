import { Test, TestingModule } from '@nestjs/testing';
import { CreateInsuredRepository } from 'src/modules/insured/repositories';
import { CreateInsuredService } from 'src/modules/insured/services';
import { createInsuredParams, createInsuredResponse } from './__mocks__/create-insured.service.mock';

describe('CreateInsuredService (Unit)', () => {
  let createInsuredService: CreateInsuredService;
  let createInsuredRepository: CreateInsuredRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInsuredService,
        {
          provide: CreateInsuredRepository,
          useFactory: () => ({
            createInsured: jest.fn(),
          }),
        },
      ],
    }).compile();

    createInsuredService = app.get<CreateInsuredService>(CreateInsuredService);
    createInsuredRepository = app.get<CreateInsuredRepository>(CreateInsuredRepository);
  });

  it('should be create an insured and returns this', async () => {
    const response = createInsuredResponse();

    jest.spyOn(createInsuredRepository, 'createInsured').mockImplementation(() => Promise.resolve(response));

    await expect(createInsuredService.create(createInsuredParams())).resolves.toEqual(response);
  });
});
