import { GenderEnum, MaritalStatusEnum, StatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants/policy-status.constant';
import {
  AddressEntity,
  AgentEntity,
  AgentTypeEntity,
  ExportEntity,
  HabitationEntity,
  HabitationTypeEntity,
  InsuredEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductEntity,
  PropertyEntity,
} from 'src/modules/database/models';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { AgentTypeEnum } from 'src/modules/policy/constants';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindPoliciesNotExportedRepositorySeeder extends SeederAbstract {
  policyRepository: Repository<PolicyEntity>;
  planRepository: Repository<PlanEntity>;
  productRepository: Repository<ProductEntity>;
  insuredRepository: Repository<InsuredEntity>;
  addressRepository: Repository<AddressEntity>;
  policiesResidentialRepository: Repository<PolicyResidentialEntity>;
  agentRepository: Repository<AgentEntity>;
  agentTypeRepository: Repository<AgentTypeEntity>;
  propertyRepository: Repository<PropertyEntity>;
  exportRepository: Repository<ExportEntity>;
  habitationTypeRepository: Repository<HabitationTypeEntity>;
  habitationRepository: Repository<HabitationEntity>;

  constructor() {
    super();

    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.addressRepository = this.connection.getRepository(AddressEntity);
    this.policiesResidentialRepository = this.connection.getRepository(PolicyResidentialEntity);
    this.agentTypeRepository = this.connection.getRepository(AgentTypeEntity);
    this.agentRepository = this.connection.getRepository(AgentEntity);
    this.propertyRepository = this.connection.getRepository(PropertyEntity);
    this.exportRepository = this.connection.getRepository(ExportEntity);
    this.habitationTypeRepository = this.connection.getRepository(HabitationTypeEntity);
    this.habitationRepository = this.connection.getRepository(HabitationEntity);
  }

  public async seed(): Promise<void> {
    await this.addressRepository.save(this.address);
  }

  public async seedResidential(): Promise<void> {
    const product = await this.productRepository.save(this.productResidential);
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const agentType = await this.agentTypeRepository.save(this.agentType);
    const agent = await this.agentRepository.save(this.agent(agentType.id));
    const policy = await this.policyRepository.save(
      this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.ISSUED),
    );
    const typeHousing = await this.habitationTypeRepository.save(this.habitationType);
    const housing = await this.habitationRepository.save(this.habitation(typeHousing.id));
    const property = await this.propertyRepository.save(this.property(housing.id));
    await this.policiesResidentialRepository.save(this.policyResidential(policy.id, address.id, property.id));
  }

  public async seedDIH(): Promise<void> {
    const product = await this.productRepository.save(this.productDih);
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const agentType = await this.agentTypeRepository.save(this.agentType);
    const agent = await this.agentRepository.save(this.agent(agentType.id));
    await this.policyRepository.save(this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.ISSUED));
  }

  public async seedDihExported(): Promise<void> {
    const product = await this.productRepository.save(this.productDih);
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const agentType = await this.agentTypeRepository.save(this.agentType);
    const agent = await this.agentRepository.save(this.agent(agentType.id));
    const routine = await this.exportRepository.save(this.exportRoutine(StatusEnum.SUCCESS));
    await this.policyRepository.save(
      this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.ISSUED, routine),
    );
  }

  public async seedDihCanceled(): Promise<void> {
    const product = await this.productRepository.save(this.productDih);
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const agentType = await this.agentTypeRepository.save(this.agentType);
    const agent = await this.agentRepository.save(this.agent(agentType.id));
    await this.policyRepository.save(
      this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.CANCELLED),
    );
  }

  public async seedExportedWithError(): Promise<void> {
    const product = await this.productRepository.save(this.productDih);
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const agentType = await this.agentTypeRepository.save(this.agentType);
    const agent = await this.agentRepository.save(this.agent(agentType.id));
    const routine = await this.exportRepository.save(this.exportRoutine(StatusEnum.ERROR));
    await this.policyRepository.save(
      this.policy(agent.id, insured.id, plan.id, address.id, PolicyStatusEnum.ISSUED, routine),
    );
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.policiesResidentialRepository.metadata.tableName);
    await this.truncateTable(this.habitationRepository.metadata.tableName);
    await this.truncateTable(this.habitationTypeRepository.metadata.tableName);
    await this.truncateTable(this.propertyRepository.metadata.tableName);
    await this.truncateTable(this.exportRepository.metadata.tableName);
    await this.truncateTable(this.policyRepository.metadata.tableName);
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.agentTypeRepository.metadata.tableName);
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.addressRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.productRepository.metadata.tableName);
  }

  public async policyResidentialExpected(): Promise<PolicyEntity[]> {
    return this.policyRepository
      .createQueryBuilder('policy')
      .select()
      .innerJoinAndSelect('policy.plan', 'plan')
      .innerJoin('plan.product', 'product')
      .innerJoinAndSelect('policy.insured', 'insured')
      .innerJoinAndSelect('policy.address', 'insuredAddress')
      .innerJoinAndSelect('policy.policiesResidential', 'policiesResidential')
      .innerJoinAndSelect('policiesResidential.address', 'addressRisk')
      .getMany();
  }

  public async policyDihExpected(): Promise<PolicyEntity[]> {
    return this.policyRepository
      .createQueryBuilder('policy')
      .select()
      .innerJoinAndSelect('policy.plan', 'plan')
      .innerJoin('plan.product', 'product')
      .innerJoinAndSelect('policy.insured', 'insured')
      .innerJoinAndSelect('policy.address', 'insuredAddress')
      .getMany();
  }

  private productResidential: Partial<ProductEntity> = {
    description: 'Produto Residencial',
    branchGroupNumber: 1,
    branchNumber: 1,
    type: ProductTypeEnum.RESIDENTIAL,
  };

  private habitationType: Partial<HabitationTypeEntity> = {
    description: 'description',
    key: 'key',
  };

  private productDih: Partial<ProductEntity> = {
    description: 'Produto DIH',
    branchGroupNumber: 2,
    branchNumber: 2,
    type: ProductTypeEnum.DEFAULT,
  };

  private habitation(habitationTypeId: number): Partial<HabitationEntity> {
    return {
      code: 'T',
      description: 'Test',
      habitationTypeId,
    };
  }

  private plan(product_id: number): Partial<PlanEntity> {
    return {
      code: 1,
      description: 'Plano Alfa',
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

  private exportRoutine(status: StatusEnum): Partial<ExportEntity> {
    return {
      type: ExportTypeEnum.RE,
      log: 'log',
      file: 'teste.txt',
      status: status,
    };
  }

  private policy(
    agent_id: number,
    insured_id: number,
    plan_id: number,
    address_id: number,
    statusPolicy: PolicyStatusEnum,
    routine?: ExportEntity,
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
      export: routine,
      totalValue: 9.9,
      liquidValue: 9.9,
      iofValue: 1,
    };
  }

  private property(habitationType_id: number): Partial<PropertyEntity> {
    return {
      constructionTypeId: habitationType_id,
      housingTypeId: habitationType_id,
      propertyTypeId: habitationType_id,
    };
  }

  private policyResidential(
    policy_id: number,
    address_id: number,
    property_id: number,
  ): Partial<PolicyResidentialEntity> {
    return {
      policyId: policy_id,
      addressId: address_id,
      propertyId: property_id,
    };
  }
}
