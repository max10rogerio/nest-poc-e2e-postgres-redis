import { Test, TestingModule } from '@nestjs/testing';
import { FindPoliciesNotExportedRepository } from 'src/modules/export/repositories/find-policies-not-exported.repository';
import { FindPoliciesNotExportedService } from 'src/modules/export/services/';
import { policiesNotExportedMock, policyNotExported } from './__mocks__/find-policies-not-exported.service.mock';

describe('FindPoliciesNotExportedService Unit', () => {
  let findPoliciesNotExportedService: FindPoliciesNotExportedService;
  let findPoliciesNotExportedRepository: FindPoliciesNotExportedRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindPoliciesNotExportedService,
        {
          provide: FindPoliciesNotExportedRepository,
          useFactory: () => ({
            findPoliciesNotExportedResidential: jest.fn(),
            findPoliciesNotExportedDIH: jest.fn(),
          }),
        },
      ],
    }).compile();

    findPoliciesNotExportedRepository = app.get<FindPoliciesNotExportedRepository>(FindPoliciesNotExportedRepository);
    findPoliciesNotExportedService = app.get<FindPoliciesNotExportedService>(FindPoliciesNotExportedService);
  });

  it('should return residential policy not exported', async () => {
    jest
      .spyOn(findPoliciesNotExportedRepository, 'findPoliciesNotExportedResidential')
      .mockResolvedValue(policiesNotExportedMock);

    const result = await findPoliciesNotExportedService.findPoliciesNotExportedResidential();

    expect(result).toEqual([policyNotExported]);
  });

  it('should return DIH policy not exported', async () => {
    jest
      .spyOn(findPoliciesNotExportedRepository, 'findPoliciesNotExportedDIH')
      .mockResolvedValue(policiesNotExportedMock);

    const result = await findPoliciesNotExportedService.findPoliciesNotExportedDIH();

    expect(result).toEqual([policyNotExported]);
  });
});
