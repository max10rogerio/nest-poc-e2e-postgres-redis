import * as dayjs from 'dayjs';
import { makeFileURL } from 'src/config';
import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { InstallmentEntity, InsuredEntity, PlanEntity, PolicyEntity, ProductEntity } from 'src/modules/database/models';
import { InstallmentStatusEnum } from 'src/modules/policy/constants';
import { FindPolicyByIdResponseDTO } from 'src/modules/policy/controllers/dto';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindPolicyByIdControllerSeeder extends SeederAbstract {
  policyRepository: Repository<PolicyEntity>;
  planRepository: Repository<PlanEntity>;
  productRepository: Repository<ProductEntity>;
  installmentRepository: Repository<InstallmentEntity>;
  insuredRepository: Repository<InsuredEntity>;

  constructor() {
    super();

    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.productRepository = this.connection.getRepository(ProductEntity);
    this.installmentRepository = this.connection.getRepository(InstallmentEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
  }

  async seed(): Promise<any> {
    const product = await this.productRepository.save({
      branchGroupNumber: 1,
      branchNumber: 1,
      id: 1,
      description: 'test',
      icon: 'test.svg',
    });

    const plan = await this.planRepository.save({
      code: 1,
      description: 'test',
      id: 1,
      iofValue: 1,
      numberInstallments: 12,
      prizeValue: 1,
      summary: 'test',
      productId: product.id,
    });

    this.disableConstraints(this.insuredRepository);

    const insured = await this.insuredRepository.save({
      cpf: '50648781097',
      name: 'Insured name',
      birthDate: new Date(),
      gender: GenderEnum.MALE,
      maritalStatus: MaritalStatusEnum.SINGLE,
      telephone: '190',
      email: 'insured@mail.com',
      addressId: 1,
    });

    this.disableConstraints(this.policyRepository);
    this.disableConstraints(this.installmentRepository);

    const policy = await this.policyRepository.save({
      agentId: 1,
      addressId: 1,
      id: 1,
      iofValue: 1,
      liquidValue: 1,
      totalValue: 1,
      luckNumber: 1,
      ticket: '1',
      status: PolicyStatusEnum.ISSUED,
      planId: plan.id,
      insuredId: insured.id,
      startDate: dayjs().format('YYYY-MM-DD 00:00:00'),
      endDate: dayjs().add(1, 'year').format('YYYY-MM-DD 00:00:00'),
    });

    await this.installmentRepository.save({
      id: 1,
      number: 1,
      totalValue: 1,
      liquidValue: 1,
      iofValue: 1,
      status: InstallmentStatusEnum.PAID,
      attempts: 1,
      agency: '1',
      account: '1',
      transactionCode: 1,
      policyId: policy.id,
      dueDate: dayjs().format('YYYY-MM-DD HH:ss:mm'),
      paymentId: 1,
      requestId: '1',
    });

    this.enableConstraints(this.policyRepository);
    this.enableConstraints(this.installmentRepository);
    this.enableConstraints(this.insuredRepository);
  }

  getResponse(domain: string): FindPolicyByIdResponseDTO {
    const dto = new FindPolicyByIdResponseDTO();

    dto.end_date = dayjs().add(1, 'year').format('YYYY-MM-DD 00:00:00');
    dto.start_date = dayjs().format('YYYY-MM-DD 00:00:00');
    dto.id = 1;
    dto.iof_value = 1;
    dto.liquid_value = 1;
    dto.total_value = 1;
    dto.luck_number = 1;
    dto.ticket = '1';
    dto.plan_name = 'test';
    dto.ticket_url = makeFileURL(`api/policy/${dto.id}/pdf`, domain);
    dto.icon = makeFileURL('test.svg', domain);

    return dto;
  }

  async truncate(): Promise<void> {
    await this.truncateTable(this.policyRepository.metadata.tableName);
    await this.truncateTable(this.planRepository.metadata.tableName);
    await this.truncateTable(this.productRepository.metadata.tableName);
    await this.truncateTable(this.installmentRepository.metadata.tableName);
  }
}
