import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePolicyExportedRepository } from 'src/modules/export/repositories';
import { UpdatePolicyExportedService } from 'src/modules/export/services/';
import { expect_success, export_id, params } from './__mocks__/update-policy-exported.service.mock';

describe('UpdatePolicyExportedService Unit', () => {
  let updatePolicyExportedService: UpdatePolicyExportedService;
  let updatePolicyExportedRepository: UpdatePolicyExportedRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePolicyExportedService,
        {
          provide: UpdatePolicyExportedRepository,
          useFactory: () => ({
            updatePoliciesExported: jest.fn(),
          }),
        },
      ],
    }).compile();

    updatePolicyExportedService = app.get<UpdatePolicyExportedService>(UpdatePolicyExportedService);
    updatePolicyExportedRepository = app.get<UpdatePolicyExportedRepository>(UpdatePolicyExportedRepository);
  });

  it('should update policies', async () => {
    jest.spyOn(updatePolicyExportedRepository, 'updatePoliciesExported').mockResolvedValue(expect_success);

    expect(await updatePolicyExportedService.updatePolicyExported(params, export_id)).toBeTruthy();
  });
});
