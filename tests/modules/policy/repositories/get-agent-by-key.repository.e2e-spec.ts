import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { GetAgentByKeyRepository } from 'src/modules/policy/repositories';
import { GetAgentByKeyRepositorySeeder } from './__mocks__/get-agent-by-key.repository.mock';

describe('[Repository] GetAgentByKeyRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: GetAgentByKeyRepositorySeeder;
  let getAgentByKeyRepository: GetAgentByKeyRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    getAgentByKeyRepository = app.get<GetAgentByKeyRepository>(GetAgentByKeyRepository);

    seeder = new GetAgentByKeyRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be make join with tables and return correct value from database', async () => {
    await seeder.seed();

    const expected = {
      agentTypeId: 1,
      cnpj: '123456789',
      id: 1,
      name: 'test',
      susepCode: null,
    };

    await expect(getAgentByKeyRepository.getByKey(AgentTypeEnum.AGENT)).resolves.toEqual(
      expect.objectContaining(expected),
    );
  });
});
