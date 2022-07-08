import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { SaveTicketPdfPathPolicyRepository } from 'src/modules/policy/repositories';
import { SaveTicketPdfPathPolicyService } from 'src/modules/policy/services';

describe('CreateTicketNumberService (Unit)', () => {
  let app: TestingModule;
  let saveTicketPdfPathPolicyService: SaveTicketPdfPathPolicyService;
  let saveTicketPdfPathPolicyRepository: SaveTicketPdfPathPolicyRepository;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule, ConfigModule],
    }).compile();

    saveTicketPdfPathPolicyService = app.get<SaveTicketPdfPathPolicyService>(SaveTicketPdfPathPolicyService);
    saveTicketPdfPathPolicyRepository = app.get<SaveTicketPdfPathPolicyRepository>(SaveTicketPdfPathPolicyRepository);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be return a ticket number string', async () => {
    jest.spyOn(saveTicketPdfPathPolicyRepository, 'save');

    const policyId = 1;
    const ticketPdfPath = join(__dirname, 'test', 'test.pdf');

    await expect(saveTicketPdfPathPolicyService.save(policyId, ticketPdfPath)).resolves.toEqual(void 0);

    expect(saveTicketPdfPathPolicyRepository.save).toHaveBeenCalledWith(policyId, ticketPdfPath);
  });
});
