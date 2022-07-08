import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { SaveTicketPdfPathPolicyRepository } from 'src/modules/policy/repositories';
import { SaveTicketPdfPathPolicyRepositorySeeder } from './__mocks__/save-ticket-pdf-path-policy.repository.mock';

describe('SaveTicketPdfPathPolicyRepository - e2e', () => {
  let app: INestApplication;
  let seeder: SaveTicketPdfPathPolicyRepositorySeeder;
  let repository: SaveTicketPdfPathPolicyRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    repository = app.get<SaveTicketPdfPathPolicyRepository>(SaveTicketPdfPathPolicyRepository);

    seeder = new SaveTicketPdfPathPolicyRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be save pdf path in database record', async () => {
    await seeder.seed();
    const ticketPdfPathMock = join(__dirname, 'tickets', 'test.pdf');

    await expect(repository.save(seeder.policyId, ticketPdfPathMock)).resolves.toEqual(void 0);

    const policy = await seeder.policyRepository.findOne(seeder.policyId);

    expect(policy.ticketPDF).toEqual(ticketPdfPathMock);
  });
});
