import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { AddressEntity, AgentEntity, InsuredEntity, PlanEntity, PolicyEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CreatePolicyRepositorySeeder extends SeederAbstract {
  policyRepository: Repository<PolicyEntity>;
  agentRepository: Repository<AgentEntity>;
  planRepository: Repository<PlanEntity>;
  insuredRepository: Repository<InsuredEntity>;
  addressRepository: Repository<AddressEntity>;

  constructor() {
    super();

    this.agentRepository = this.connection.getRepository(AgentEntity);
    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.planRepository = this.connection.getRepository(PlanEntity);
    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.addressRepository = this.connection.getRepository(AddressEntity);
  }

  public async seed(): Promise<any> {
    await this.disableConstraints(this.agentRepository);
    await this.disableConstraints(this.planRepository);
    await this.disableConstraints(this.insuredRepository);

    await this.agentRepository.save({
      agentTypeId: 1,
      brokerName: 'john doe',
      cnpj: '27490734000152',
      id: 1,
      name: 'test',
    });

    await this.planRepository.save({
      code: 1,
      description: 'test',
      id: 1,
      iofValue: 1.24,
      numberInstallments: 12,
      prizeValue: 10,
      productId: 1,
      summary: 'test',
    });

    await this.insuredRepository.save({
      birthDate: '1995-01-01',
      cpf: '123456789101',
      email: 'test@test.com',
      gender: GenderEnum.MALE,
      id: 1,
      maritalStatus: MaritalStatusEnum.DIVORCED,
      name: 'Test',
      telephone: '4444444444',
    });

    await this.addressRepository.save({
      cep: '87020-230',
      city: 'Maria do Inga',
      complement: 'necessary',
      id: 1,
      neighborhood: 'holly-wood',
      number: '7',
      street: 'street fighter',
      uf: 'PR',
    });

    await this.enableConstraints(this.agentRepository);
    await this.enableConstraints(this.planRepository);
    await this.enableConstraints(this.insuredRepository);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.policyRepository.metadata.tableName);
    await this.truncateTable(this.agentRepository.metadata.tableName);
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.addressRepository.metadata.tableName);
  }
}
