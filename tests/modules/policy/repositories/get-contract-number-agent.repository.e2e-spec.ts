import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { GetContractNumberAgentRepository } from 'src/modules/policy/repositories';
import { GetContractNumberAgentRepositorySeeder } from './__mocks__/get-contract-number-agent.repository.mock';

describe('[Repository] GetContractNumberAgentRepository e2e', () => {
  let app: INestApplication;
  let seeder: GetContractNumberAgentRepositorySeeder;
  let getContractNumberAgentRepository: GetContractNumberAgentRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    getContractNumberAgentRepository = app.get<GetContractNumberAgentRepository>(GetContractNumberAgentRepository);

    seeder = new GetContractNumberAgentRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be get contract number by agentTpe and plan', async () => {
    await seeder.seed();

    const planId = await seeder.getPlanId();

    const { contractNumber } = await getContractNumberAgentRepository.getProductAgent(planId, AgentTypeEnum.AGENT);

    expect(contractNumber).toEqual(seeder.contractNumber);
  });
});
