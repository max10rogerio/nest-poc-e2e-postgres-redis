import {
  AgentEntity,
  AgentTypeEntity,
  PlanEntity,
  ProductAgentEntity,
  ProductEntity,
} from 'src/modules/database/models';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class GetContractNumberAgentRepositorySeeder extends SeederAbstract {
  agentRepository: Repository<AgentEntity>;
  agentTypeRepository: Repository<AgentTypeEntity>;
  planRepository: Repository<PlanEntity>;
  productRepository: Repository<ProductEntity>;
  productAgentRepository: Repository<ProductAgentEntity>;

  constructor() {
    super();

    this.agentRepository = this.connection.getRepository(AgentEntity);
    this.agentTypeRepository = this.connection.getRepository(AgentTypeEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
    this.productAgentRepository = this.connection.getRepository(ProductAgentEntity);
  }

  public contractNumber = 135;

  public async seed(): Promise<void> {
    const type = await this.agentTypeRepository.save({
      description: AgentTypeEnum.AGENT,
      key: AgentTypeEnum.AGENT,
    });

    const agent = await this.agentRepository.save({
      agentTypeId: type.id,
      cnpj: '123456789',
      name: 'test',
      brokerName: 'john doe',
    });

    const product = await this.productRepository.save({
      description: 'Product One',
      branchGroupNumber: 1,
      branchNumber: 1,
      type: ProductTypeEnum.DEFAULT,
    });

    await this.planRepository.save({
      description: 'Plan 1',
      code: 1,
      productId: product.id,
      prizeValue: 9.9,
    });

    await this.productAgentRepository.save({
      productId: product.id,
      agentId: agent.id,
      contractNumber: this.contractNumber,
    });
  }

  public async getPlanId(): Promise<number> {
    return (await this.planRepository.findOne()).id;
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.productAgentRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.productRepository.metadata.tableName);
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.agentTypeRepository.metadata.tableName);
  }
}
