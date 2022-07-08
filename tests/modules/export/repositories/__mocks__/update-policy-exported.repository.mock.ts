import { GenderEnum, MaritalStatusEnum, StatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants/policy-status.constant';
import {
  AddressEntity,
  AgentEntity,
  AgentTypeEntity,
  ExportEntity,
  InsuredEntity,
  PlanEntity,
  PolicyEntity,
  ProductEntity,
} from 'src/modules/database/models';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class UpdatePolicyExportedRepositorySeeder extends SeederAbstract {
  exportRepository: Repository<ExportEntity>;
  policyRepository: Repository<PolicyEntity>;
  planRepository: Repository<PlanEntity>;
  productRepository: Repository<ProductEntity>;
  insuredRepository: Repository<InsuredEntity>;
  addressRepository: Repository<AddressEntity>;
  agentRepository: Repository<AgentEntity>;
  agentTypeRepository: Repository<AgentTypeEntity>;

  constructor() {
    super();

    this.exportRepository = this.connection.getRepository(ExportEntity);
    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.addressRepository = this.connection.getRepository(AddressEntity);
    this.agentTypeRepository = this.connection.getRepository(AgentTypeEntity);
    this.agentRepository = this.connection.getRepository(AgentEntity);
  }

  public async seed(): Promise<void> {
    await this.exportRepository.save(this.exportRoutine);

    const product = await this.productRepository.save(this.productDih);
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const agentType = await this.agentTypeRepository.save(this.agentType);
    const agent = await this.agentRepository.save(this.agent(agentType.id));

    await this.policyRepository.save(this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.ISSUED));
    await this.policyRepository.save(this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.ISSUED));

    await this.exportRepository.save({
      type: ExportTypeEnum.DIH,
      log: 'log',
      file: 'file.txt',
      status: StatusEnum.SUCCESS,
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.exportRepository.metadata.tableName);
    await this.truncateTable(this.policyRepository.metadata.tableName);
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.agentTypeRepository.metadata.tableName);
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.addressRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.productRepository.metadata.tableName);
  }

  public async getRoutine(): Promise<number> {
    return (await this.exportRepository.findOne()).id;
  }

  public async getPoliciesIds(): Promise<number[]> {
    return (await this.policyRepository.createQueryBuilder('policy').select('policy.id').getMany()).map(({ id }) => id);
  }

  public async getPoliciesExported(): Promise<PolicyEntity[]> {
    return await this.policyRepository.find();
  }

  private exportRoutine: Partial<ExportEntity> = {
    type: ExportTypeEnum.RE,
    log: 'log',
    file: 'teste.txt',
    status: StatusEnum.SUCCESS,
  };

  private productDih: Partial<ProductEntity> = {
    description: 'Product One',
    branchGroupNumber: 1,
    branchNumber: 1,
    type: ProductTypeEnum.DEFAULT,
  };

  private plan(product_id: number): Partial<PlanEntity> {
    return {
      code: 1,
      description: 'Plan Alfa',
      summary: 'resumo',
      productId: product_id,
      prizeValue: 9.9,
      numberInstallments: 1,
      iofValue: 1,
    };
  }

  private address: Partial<AddressEntity> = {
    cep: '87020-000',
    street: 'Street Burguer',
    number: '10',
    neighborhood: 'Zone 07',
    complement: 'near there',
    city: 'Maringa',
    uf: 'PR',
  };

  private insured: Partial<InsuredEntity> = {
    cpf: '10955978092',
    name: 'John Johnson',
    birthDate: new Date(Date.now()),
    gender: GenderEnum.MALE,
    maritalStatus: MaritalStatusEnum.SINGLE,
    telephone: '44999998844',
    email: 'john@johnson.com.br',
  };

  private agentType: Partial<AgentTypeEntity> = {
    description: 'Vendor',
    key: AgentTypeEnum.AGENT,
  };

  private agent(agentType_id: number): Partial<AgentEntity> {
    return {
      name: 'Vendor',
      cnpj: '61728314000108',
      susepCode: 1,
      brokerName: 'broker',
      agentTypeId: agentType_id,
    };
  }

  private policy(
    agent_id: number,
    insured_id: number,
    plan_id: number,
    address_id: number,
    statusPolicy: PolicyStatusEnum,
  ): Partial<PolicyEntity> {
    return {
      ticket: '1',
      luckNumber: 1,
      contractDate: new Date(Date.now()),
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      agentId: agent_id,
      insuredId: insured_id,
      planId: plan_id,
      addressId: address_id,
      status: statusPolicy,
      totalValue: 0,
      liquidValue: 0,
      iofValue: 0,
    };
  }
}
