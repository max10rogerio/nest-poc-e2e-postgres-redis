import { AgentEntity, AgentTypeEntity } from 'src/modules/database/models';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class GetAgentByKeyRepositorySeeder extends SeederAbstract {
  agentRepository: Repository<AgentEntity>;
  agentTypeRepository: Repository<AgentTypeEntity>;

  constructor() {
    super();

    this.agentRepository = this.connection.getRepository(AgentEntity);
    this.agentTypeRepository = this.connection.getRepository(AgentTypeEntity);
  }

  public async seed(): Promise<void> {
    const type = await this.agentTypeRepository.save({
      description: AgentTypeEnum.AGENT,
      key: AgentTypeEnum.AGENT,
    });

    await this.agentRepository.save({
      agentTypeId: type.id,
      cnpj: '123456789',
      name: 'test',
      brokerName: 'john doe',
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.agentTypeRepository.metadata.tableName);
  }
}
