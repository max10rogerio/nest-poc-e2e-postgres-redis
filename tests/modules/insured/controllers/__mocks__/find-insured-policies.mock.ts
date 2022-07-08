import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { InsuredEntity, PlanEntity, PolicyEntity, ProductEntity } from 'src/modules/database/models';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindInsuredPoliciesSeeder extends SeederAbstract {
  policyRepository: Repository<PolicyEntity>;
  planRepository: Repository<PlanEntity>;
  insuredRepository: Repository<InsuredEntity>;
  productRepository: Repository<ProductEntity>;

  cpf = '08968732930';

  constructor() {
    super();

    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
  }

  async seed(): Promise<any> {
    await this.productRepository.save({
      branchGroupNumber: 1,
      branchNumber: 1,
      description: 'test',
      icon: 'test.jpg',
      id: 1,
      type: ProductTypeEnum.DEFAULT,
    });

    await this.planRepository.save({
      code: 1,
      description: 'test',
      id: 1,
      productId: 1,
      iofValue: 1,
      numberInstallments: 12,
      prizeValue: 1,
      summary: 'test',
    });

    await this.disableConstraints(this.policyRepository);
    await this.disableConstraints(this.insuredRepository);

    await this.insuredRepository.save({
      id: 1,
      birthDate: '2022-01-01',
      cpf: this.cpf,
      email: 'test@test.com',
      gender: GenderEnum.FEMALE,
      maritalStatus: MaritalStatusEnum.SINGLE,
      name: 'test',
      telephone: '44998825268',
    });

    await this.policyRepository.save({
      id: 1,
      agentId: 1,
      contractDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      insuredId: 1,
      iofValue: 1,
      liquidValue: 1,
      luckNumber: 1,
      planId: 1,
      ticket: '123456',
      status: PolicyStatusEnum.ISSUED,
      totalValue: 1,
      addressId: 1,
    });

    await this.enableConstraints(this.policyRepository);
    await this.enableConstraints(this.insuredRepository);
  }

  async truncate(): Promise<void> {
    await this.truncateTable(this.productRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.policyRepository.metadata.tableName);
  }
}
