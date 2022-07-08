import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import {
  AddressEntity,
  AgentEntity,
  AgentTypeEntity,
  CoverageEntity,
  CoverageTypeEntity,
  HabitationEntity,
  HabitationTypeEntity,
  InstallmentEntity,
  InsuredEntity,
  PlanCoverageEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductAgentEntity,
  ProductEntity,
  PropertyEntity,
} from 'src/modules/database/models';
import { AgentTypeEnum, InstallmentStatusEnum } from 'src/modules/policy/constants';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindTicketReportDataRepositorySeeder extends SeederAbstract {
  agentRepository: Repository<AgentEntity>;
  agentTypeRepository: Repository<AgentTypeEntity>;
  policyRepository: Repository<PolicyEntity>;
  insuredRepository: Repository<InsuredEntity>;
  addressRepository: Repository<AddressEntity>;
  productRepository: Repository<ProductEntity>;
  planRepository: Repository<PlanEntity>;
  productAgentRepository: Repository<ProductAgentEntity>;
  policyResidentialRepository: Repository<PolicyResidentialEntity>;
  habitationTypeRepository: Repository<HabitationTypeEntity>;
  habitationRepository: Repository<HabitationEntity>;
  propertyRepository: Repository<PropertyEntity>;
  coverageTypeRepository: Repository<CoverageTypeEntity>;
  coverageRepository: Repository<CoverageEntity>;
  planCoverageRepository: Repository<PlanCoverageEntity>;
  installmentRepository: Repository<InstallmentEntity>;

  constructor() {
    super();

    this.agentRepository = this.connection.getRepository(AgentEntity);
    this.agentTypeRepository = this.connection.getRepository(AgentTypeEntity);
    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.addressRepository = this.connection.getRepository(AddressEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.productAgentRepository = this.connection.getRepository(ProductAgentEntity);
    this.policyResidentialRepository = this.connection.getRepository(PolicyResidentialEntity);
    this.habitationTypeRepository = this.connection.getRepository(HabitationTypeEntity);
    this.habitationRepository = this.connection.getRepository(HabitationEntity);
    this.propertyRepository = this.connection.getRepository(PropertyEntity);
    this.coverageTypeRepository = this.connection.getRepository(CoverageTypeEntity);
    this.coverageRepository = this.connection.getRepository(CoverageEntity);
    this.planCoverageRepository = this.connection.getRepository(PlanCoverageEntity);
    this.installmentRepository = this.connection.getRepository(InstallmentEntity);
  }

  public async seed(): Promise<void> {
    const typeBroker = await this.agentTypeRepository.save(this.brokerType);
    const typeAgent = await this.agentTypeRepository.save(this.agentType);
    const brokerRegister = await this.agentRepository.save(this.broker(typeBroker.id));
    const agentRegister = await this.agentRepository.save(this.agent(typeAgent.id));
    const product = await this.productRepository.save(this.productRes);
    await this.productAgentRepository.save(this.productAgent(product.id, agentRegister.id));
    await this.productAgentRepository.save(this.productAgent(product.id, brokerRegister.id));
    const plan = await this.planRepository.save(this.plan(product.id));
    const address = await this.addressRepository.save(this.address);
    const insured = await this.insuredRepository.save(this.insured);
    const policy = await this.policyRepository.save(this.policy(agentRegister.id, insured.id, plan.id, address.id));

    const constructionType = await this.habitationTypeRepository.save(this.constructionType);
    const immobileType = await this.habitationTypeRepository.save(this.immobileType);
    const housingType = await this.habitationTypeRepository.save(this.housingType);
    const housing = await this.habitationRepository.save(this.habitation(housingType.id));
    const construction = await this.habitationRepository.save(this.construction(constructionType.id));
    const immobile = await this.habitationRepository.save(this.immobile(immobileType.id));
    const property = await this.propertyRepository.save(this.property(construction.id, housing.id, immobile.id));
    await this.policyResidentialRepository.save(this.policyResidential(address.id, policy.id, property.id));

    const supportTypeCoverage = await this.coverageTypeRepository.save(this.supportTypeCoverage);
    const coverageTypeCoverage = await this.coverageTypeRepository.save(this.coverageTypeCoverage);
    const benefitsTypeCoverage = await this.coverageTypeRepository.save(this.benefitsTypeCoverage);
    const supportPlumber = await this.coverageRepository.save(this.supportPlumberCoverage(supportTypeCoverage.id));
    const supportkeychain = await this.coverageRepository.save(this.supportkeychainCoverage(supportTypeCoverage.id));
    const coverageFire = await this.coverageRepository.save(this.coverageFireCoverage(coverageTypeCoverage.id));
    const coverageGale = await this.coverageRepository.save(this.coverageGaleCoverage(coverageTypeCoverage.id));
    const benefitsRaffle = await this.coverageRepository.save(this.benefitsRaffleCoverage(benefitsTypeCoverage.id));
    await this.planCoverageRepository.save(this.planCoverageGeneric(plan.id, supportPlumber.id));
    await this.planCoverageRepository.save(this.planCoverageGeneric(plan.id, supportkeychain.id));
    await this.planCoverageRepository.save(this.planCoverageGeneric(plan.id, coverageFire.id));
    await this.planCoverageRepository.save(this.planCoverageGeneric(plan.id, coverageGale.id));
    await this.planCoverageRepository.save(this.planCoverageGeneric(plan.id, benefitsRaffle.id));

    await this.installmentRepository.save(this.installment(policy.id, 1));
    await this.installmentRepository.save(this.installment(policy.id, 2));
    await this.installmentRepository.save(this.installment(policy.id, 3));
  }

  public async updateProdutToTypeDefault() {
    const product = await this.productRepository.findOne();
    product.type = ProductTypeEnum.DEFAULT;
    await product.save();
  }

  private brokerType: Partial<AgentTypeEntity> = {
    description: AgentTypeEnum.BROKER,
    key: AgentTypeEnum.BROKER,
  };

  private agentType: Partial<AgentTypeEntity> = {
    description: AgentTypeEnum.AGENT,
    key: AgentTypeEnum.AGENT,
  };

  private broker(typeId: number): Partial<AgentEntity> {
    return {
      agentTypeId: typeId,
      susepCode: 123456,
      name: 'Mario',
      brokerName: 'Mario Broker',
      cnpj: '92582889000180',
    };
  }

  private agent(typeId: number): Partial<AgentEntity> {
    return {
      agentTypeId: typeId,
      susepCode: 654321,
      name: 'Oiram',
      brokerName: 'Oiram Agent',
      cnpj: '50161743000111',
    };
  }

  private productRes: Partial<ProductEntity> = {
    description: 'Produto RES',
    branchGroupNumber: 2,
    branchNumber: 2,
    type: ProductTypeEnum.RESIDENTIAL,
    susepCode: 456,
    contractName: 'Name of Contract',
  };

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

  private policy(agentId: number, insuredId: number, planId: number, addressId: number): Partial<PolicyEntity> {
    return {
      ticket: '123',
      luckNumber: 87001,
      contractDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      agentId: agentId,
      insuredId: insuredId,
      planId: planId,
      status: PolicyStatusEnum.ISSUED,
      totalValue: 9.9,
      liquidValue: 9.9,
      iofValue: 1,
      addressId: addressId,
    };
  }

  private productAgent(productId: number, agentId: number): Partial<ProductAgentEntity> {
    return {
      agentId: agentId,
      productId: productId,
      contractNumber: 123,
      commissionPercentage: 10,
    };
  }

  private constructionType: Partial<HabitationTypeEntity> = {
    description: 'Tipo de construção',
    key: 'construction',
  };

  private immobileType: Partial<HabitationTypeEntity> = {
    description: 'Tipo de imóvel',
    key: 'immobile',
  };

  private housingType: Partial<HabitationTypeEntity> = {
    description: 'Tipo de moradia',
    key: 'home',
  };

  private habitation(housingTypeId: number): Partial<HabitationEntity> {
    return {
      code: 'H',
      description: 'Habitual',
      habitationTypeId: housingTypeId,
    };
  }

  private construction(constructionTypeId: number): Partial<HabitationEntity> {
    return {
      code: 'AL',
      description: 'Alvenaria',
      habitationTypeId: constructionTypeId,
    };
  }

  private immobile(immobileTypeId: number): Partial<HabitationEntity> {
    return {
      code: 'CA',
      description: 'Casa',
      habitationTypeId: immobileTypeId,
    };
  }

  private property(constructionTypeId: number, housingTypeId: number, propertyTypeId: number): Partial<PropertyEntity> {
    return {
      constructionTypeId,
      housingTypeId,
      propertyTypeId,
    };
  }

  private policyResidential(addressId: number, policyId: number, propertyId: number): Partial<PolicyResidentialEntity> {
    return {
      addressId: addressId,
      policyId: policyId,
      propertyId: propertyId,
    };
  }

  private supportTypeCoverage: Partial<CoverageTypeEntity> = {
    description: 'Assistência',
    key: 'support',
    order: 1,
  };

  private coverageTypeCoverage: Partial<CoverageTypeEntity> = {
    description: 'Cobertura',
    key: 'coverages',
    order: 2,
  };

  private benefitsTypeCoverage: Partial<CoverageTypeEntity> = {
    description: 'Vantagem',
    key: 'benefits',
    order: 3,
  };

  private supportPlumberCoverage(typeId: number): Partial<CoverageEntity> {
    return {
      coverageTypeId: typeId,
      title: 'Encanador',
      order: 1,
    };
  }

  private supportkeychainCoverage(typeId: number): Partial<CoverageEntity> {
    return {
      coverageTypeId: typeId,
      title: 'Chaveiro',
      order: 2,
    };
  }

  private coverageFireCoverage(typeId: number): Partial<CoverageEntity> {
    return {
      coverageTypeId: typeId,
      title: 'Incêndio, Explosão de Qualquer Natureza',
      order: 1,
    };
  }

  private coverageGaleCoverage(typeId: number): Partial<CoverageEntity> {
    return {
      coverageTypeId: typeId,
      title: 'Vendaval, Furacão, Tornado, Granizo',
      order: 2,
    };
  }

  private benefitsRaffleCoverage(typeId: number): Partial<CoverageEntity> {
    return {
      coverageTypeId: typeId,
      title: 'Sorteio Mensal',
      order: 1,
    };
  }

  private planCoverageGeneric(planId: number, coverageId: number): Partial<PlanCoverageEntity> {
    return {
      planId: planId,
      coverageId: coverageId,
      generalText: 'Limitado ao que a gazin quiser',
      capitalText: 'Até 30',
      capitalValue: 50,
      franchiseText: 'Franquia',
      shortageText: 'Texto shortage',
      prizeValue: 19.9,
    };
  }

  private installment(policyId: number, installmentNumber: number): Partial<InstallmentEntity> {
    return {
      policyId: policyId,
      number: installmentNumber,
      account: '12345',
      agency: '321',
      dueDate: new Date().toISOString().slice(0, 10),
      iofValue: 1.1,
      totalValue: 9.9,
      liquidValue: 8.8,
      status: InstallmentStatusEnum.PAID,
      attempts: 1,
    };
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.agentTypeRepository.metadata.tableName);
    await this.truncateTable(this.policyRepository.metadata.tableName);
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.addressRepository.metadata.tableName);
    await this.truncateTable(this.productRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.productAgentRepository.metadata.tableName);
    await this.truncateTable(this.policyResidentialRepository.metadata.tableName);
    await this.truncateTable(this.habitationTypeRepository.metadata.tableName);
    await this.truncateTable(this.habitationRepository.metadata.tableName);
    await this.truncateTable(this.propertyRepository.metadata.tableName);
    await this.truncateTable(this.coverageTypeRepository.metadata.tableName);
    await this.truncateTable(this.coverageRepository.metadata.tableName);
    await this.truncateTable(this.planCoverageRepository.metadata.tableName);
    await this.truncateTable(this.installmentRepository.metadata.tableName);
  }

  public residentialExpected = {
    product: {
      title: 'Produto RES',
      group: '22',
      susepCode: '456',
      contractName: 'Name of Contract',
    },
    policy: {
      ticket: '123',
      luckNumber: '87001',
      createdAt: undefined,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      totalValue: 9.9,
      iofPercentage: 1,
      iofValue: 1,
      comissionTotalPercentage: 20,
      agent: {
        name: 'Oiram',
        cnpj: '50161743000111',
        comissionPercentage: '10.00',
        comissionValue: 0.99,
      },
      broker: {
        name: 'Mario Broker',
        susepCode: 123456,
      },
      insured: {
        name: 'John Johnson',
        birthdate: new Date().toISOString().slice(0, 10),
        cpf: '10955978092',
        gender: 'M',
        phoneNumber: '44999998844',
        address: {
          zipCode: '87020-000',
          street: 'Street Burguer',
          neighborhood: 'Zone 07',
          complement: 'near there',
          houseNumber: '10',
          state: 'PR',
        },
      },
      residential: {
        habitation: 'Habitual',
        construction: 'Alvenaria',
        property: 'Casa',
        address: {
          zipCode: '87020-000',
          street: 'Street Burguer',
          neighborhood: 'Zone 07',
          complement: 'near there',
          houseNumber: '10',
          state: 'PR',
        },
      },
      coverages: [
        {
          title: 'Incêndio, Explosão de Qualquer Natureza',
          maxLimitIndenization: 50,
          franchiseText: 'Franquia',
          prizeValue: 19.9,
          shortageText: 'Texto shortage',
        },
        {
          title: 'Vendaval, Furacão, Tornado, Granizo',
          maxLimitIndenization: 50,
          franchiseText: 'Franquia',
          prizeValue: 19.9,
          shortageText: 'Texto shortage',
        },
      ],
      benefitsAndSupports: [
        {
          title: 'Encanador',
          capitalValue: 50,
          generalText: 'Limitado ao que a gazin quiser',
        },
        {
          title: 'Sorteio Mensal',
          capitalValue: 50,
          generalText: 'Limitado ao que a gazin quiser',
        },
        {
          title: 'Chaveiro',
          capitalValue: 50,
          generalText: 'Limitado ao que a gazin quiser',
        },
      ],
      payments: [
        {
          number: 1,
          dueDate: new Date(new Date().toISOString().slice(0, 10)),
          iofValue: 1.1,
          totalValue: 9.9,
          agency: '321',
          account: '12345',
        },
        {
          number: 2,
          dueDate: new Date(new Date().toISOString().slice(0, 10)),
          iofValue: 1.1,
          totalValue: 9.9,
          agency: '321',
          account: '12345',
        },
        {
          number: 3,
          dueDate: new Date(new Date().toISOString().slice(0, 10)),
          iofValue: 1.1,
          totalValue: 9.9,
          agency: '321',
          account: '12345',
        },
      ],
    },
  };

  public defaultExpected = {
    product: {
      title: 'Produto RES',
      group: '22',
      susepCode: '456',
      contractName: 'Name of Contract',
    },
    policy: {
      ticket: '123',
      luckNumber: '87001',
      createdAt: undefined,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      totalValue: 9.9,
      iofPercentage: 1,
      iofValue: 1,
      comissionTotalPercentage: 20,
      agent: {
        name: 'Oiram',
        cnpj: '50161743000111',
        comissionPercentage: '10.00',
        comissionValue: 0.99,
      },
      broker: {
        name: 'Mario Broker',
        susepCode: 123456,
      },
      insured: {
        name: 'John Johnson',
        birthdate: new Date().toISOString().slice(0, 10),
        cpf: '10955978092',
        gender: 'M',
        phoneNumber: '44999998844',
        address: {
          zipCode: '87020-000',
          street: 'Street Burguer',
          neighborhood: 'Zone 07',
          complement: 'near there',
          houseNumber: '10',
          state: 'PR',
        },
      },
      residential: {
        habitation: '',
        construction: '',
        property: '',
        address: {
          zipCode: '',
          street: '',
          neighborhood: '',
          complement: '',
          houseNumber: '',
          state: '',
        },
      },
      coverages: [
        {
          title: 'Incêndio, Explosão de Qualquer Natureza',
          maxLimitIndenization: 50,
          franchiseText: 'Franquia',
          prizeValue: 19.9,
          shortageText: 'Texto shortage',
        },
        {
          title: 'Vendaval, Furacão, Tornado, Granizo',
          maxLimitIndenization: 50,
          franchiseText: 'Franquia',
          prizeValue: 19.9,
          shortageText: 'Texto shortage',
        },
      ],
      benefitsAndSupports: [
        {
          title: 'Encanador',
          capitalValue: 50,
          generalText: 'Limitado ao que a gazin quiser',
        },
        {
          title: 'Sorteio Mensal',
          capitalValue: 50,
          generalText: 'Limitado ao que a gazin quiser',
        },
        {
          title: 'Chaveiro',
          capitalValue: 50,
          generalText: 'Limitado ao que a gazin quiser',
        },
      ],
      payments: [
        {
          number: 1,
          dueDate: new Date(new Date().toISOString().slice(0, 10)),
          iofValue: 1.1,
          totalValue: 9.9,
          agency: '321',
          account: '12345',
        },
        {
          number: 2,
          dueDate: new Date(new Date().toISOString().slice(0, 10)),
          iofValue: 1.1,
          totalValue: 9.9,
          agency: '321',
          account: '12345',
        },
        {
          number: 3,
          dueDate: new Date(new Date().toISOString().slice(0, 10)),
          iofValue: 1.1,
          totalValue: 9.9,
          agency: '321',
          account: '12345',
        },
      ],
    },
  };
}
