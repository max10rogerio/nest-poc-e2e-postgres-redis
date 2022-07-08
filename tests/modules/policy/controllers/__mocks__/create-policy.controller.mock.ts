import {
  AddressEntity,
  AgentEntity,
  AgentTypeEntity,
  CoverageEntity,
  CoverageTypeEntity,
  HabitationEntity,
  HabitationTypeEntity,
  InsuredEntity,
  LogPaymentsEntity,
  LotteryConfigEntity,
  PaymentsEntity,
  PlanCoverageEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductAgentEntity,
  ProductEntity,
  PropertyEntity,
} from 'src/modules/database/models';
import { GatewayPaymentResponse } from 'src/modules/gateway-lydians/repositories';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CreatePolicyControllerSeeder extends SeederAbstract {
  lotteryConfigRepository: Repository<LotteryConfigEntity>;
  agentTypeRepository: Repository<AgentTypeEntity>;
  agentRepository: Repository<AgentEntity>;
  policyRepository: Repository<PolicyEntity>;
  planRepository: Repository<PlanEntity>;
  productAgentRepository: Repository<ProductAgentEntity>;
  productRepository: Repository<ProductEntity>;
  coverageTypeRepository: Repository<CoverageTypeEntity>;
  coverageRepository: Repository<CoverageEntity>;
  planCoverageRepository: Repository<PlanCoverageEntity>;

  addressRepository: Repository<AddressEntity>;
  insuredRepository: Repository<InsuredEntity>;
  paymentRepository: Repository<PaymentsEntity>;
  paymentsLogsRepository: Repository<LogPaymentsEntity>;
  propertyRepository: Repository<PropertyEntity>;
  policyResidentialRepository: Repository<PolicyResidentialEntity>;
  habitationTypeRepository: Repository<HabitationTypeEntity>;
  habitationRepository: Repository<HabitationEntity>;

  constructor() {
    super();

    this.lotteryConfigRepository = this.connection.getRepository(LotteryConfigEntity);
    this.agentTypeRepository = this.connection.getRepository(AgentTypeEntity);
    this.agentRepository = this.connection.getRepository(AgentEntity);
    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
    this.coverageRepository = this.connection.getRepository(CoverageEntity);
    this.planCoverageRepository = this.connection.getRepository(PlanCoverageEntity);
    this.coverageTypeRepository = this.connection.getRepository(CoverageTypeEntity);
    this.coverageRepository = this.connection.getRepository(CoverageEntity);
    this.habitationTypeRepository = this.connection.getRepository(HabitationTypeEntity);
    this.habitationRepository = this.connection.getRepository(HabitationEntity);

    this.addressRepository = this.connection.getRepository(AddressEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.paymentRepository = this.connection.getRepository(PaymentsEntity);
    this.paymentsLogsRepository = this.connection.getRepository(LogPaymentsEntity);
    this.policyResidentialRepository = this.connection.getRepository(PolicyResidentialEntity);
    this.productAgentRepository = this.connection.getRepository(ProductAgentEntity);
  }

  public async seed(productType: ProductTypeEnum = ProductTypeEnum.DEFAULT): Promise<any> {
    const product = await this.productRepository.save({
      branchGroupNumber: 1,
      branchNumber: 1,
      description: 'test',
      id: 1,
      type: productType,
    });

    await this.lotteryConfigRepository.save({
      finalRange: 9000,
      initialRange: 87000,
      lastNumber: 0,
    });

    const type = await this.agentTypeRepository.save({
      description: AgentTypeEnum.AGENT,
      key: AgentTypeEnum.AGENT,
    });

    const agent = await this.agentRepository.save({
      agentTypeId: type.id,
      cnpj: '123456789',
      name: 'tests',
      brokerName: 'john doe',
    });

    const plan = await this.planRepository.save({
      code: 1,
      description: 'test',
      id: 1,
      iofValue: 1.24,
      numberInstallments: 12,
      prizeValue: 10,
      productId: product.id,
      summary: 'test',
    });

    const coverageType = await this.coverageTypeRepository.save({
      description: 'test',
      id: 1,
      key: 'test',
    });

    const coverage = await this.coverageRepository.save({
      coverageTypeId: coverageType.id,
      description: 'test',
      id: 1,
      title: 'test',
    });

    await this.planCoverageRepository.save({
      id: 1,
      planId: plan.id,
      coverageId: coverage.id,
      prizeValue: 1,
      summaryText: 'test',
      capitalValue: 1,
    });

    const habitationType = await this.habitationTypeRepository.save({
      description: 'test',
      key: 'test',
      id: 1,
    });

    await this.habitationRepository.save({
      code: 'H',
      id: 1,
      habitationTypeId: habitationType.id,
      description: 'test',
    });

    await this.productAgentRepository.save({
      agentId: agent.id,
      productId: 1,
      contractNumber: 135,
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.lotteryConfigRepository.metadata.tableName);
    await this.truncateTable(this.productAgentRepository.metadata.tableName);
    await this.truncateTable(this.agentTypeRepository.metadata.tableName);
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.policyRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.productRepository.metadata.tableName);
    await this.truncateTable(this.coverageRepository.metadata.tableName);
    await this.truncateTable(this.planCoverageRepository.metadata.tableName);
    await this.truncateTable(this.coverageTypeRepository.metadata.tableName);
    await this.truncateTable(this.coverageRepository.metadata.tableName);
    await this.truncateTable(this.habitationTypeRepository.metadata.tableName);
    await this.truncateTable(this.habitationRepository.metadata.tableName);

    await this.truncateTable(this.addressRepository.metadata.tableName);
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.paymentRepository.metadata.tableName);
    await this.truncateTable(this.paymentsLogsRepository.metadata.tableName);
    await this.truncateTable(this.policyResidentialRepository.metadata.tableName);
  }
}

export const makeGatewayPaymentResponseMock = (): GatewayPaymentResponse => ({
  application_name: 'test',
  created_at: '2022-01-01',
  http_status: '200',
  id: '1',
  request_id: '1',
  response: {
    SeqLanc: 1,
    VersaoXML: 1,
  },
  seq_lanc: 1,
  updated_at: '2022-01-01',
});
