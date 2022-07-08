import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyNotFound } from 'src/errors';
import {
  AddressEntity,
  AgentEntity,
  InstallmentEntity,
  InsuredEntity,
  PlanCoverageEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductEntity,
} from 'src/modules/database/models';
import { TicketContext } from 'src/modules/pdf/contexts';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { Repository } from 'typeorm';
import { AgentTypeEnum } from '../constants';

@Injectable()
export class FindTicketReportDataRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
    @InjectRepository(InstallmentEntity)
    private readonly installmentRepository: Repository<InstallmentEntity>,
    @InjectRepository(AgentEntity)
    private readonly agentyRepository: Repository<AgentEntity>,
    @InjectRepository(InsuredEntity)
    private readonly insuredRepository: Repository<InsuredEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(PlanCoverageEntity)
    private readonly planCoverageRepository: Repository<PlanCoverageEntity>,
    @InjectRepository(PolicyResidentialEntity)
    private readonly policyResidentialRepository: Repository<PolicyResidentialEntity>,
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async findPolicyReportData(policyId: number): Promise<TicketContext> {
    const policy = await this.findPolicy(policyId);

    if (!policy) throw new PolicyNotFound(policyId);

    const broker = await this.findBroker();
    const product = await this.findProduct(policy.planId);
    const agent = await this.findAgent(policy.agentId, product.id);
    const plan = await this.findPlan(policy.planId);
    const insured = await this.findInsured(policy.insuredId);
    const policyAddress = await this.findAddress(policy.addressId);
    const residential = product.type == ProductTypeEnum.RESIDENTIAL ? await this.findResidential(policyId) : undefined;
    const coverages = await this.findCoverages(policy.planId);
    const benefitsAndSupports = await this.findBenefitsAndSupports(policy.planId);
    const payments = await this.findPayments(policyId);

    return {
      product: this.formatProduct(product),
      policy: {
        ticket: policy.ticket,
        luckNumber: policy.luckNumber.toString(),
        createdAt: policy.createdAt,
        startDate: policy.startDate,
        endDate: policy.endDate,
        totalValue: policy.totalValue,
        iofPercentage: plan.iofValue,
        iofValue: policy.iofValue,
        comissionTotalPercentage: Number(broker.commissionPercentage) + Number(agent.commissionPercentage),
        agent: this.formatAgent(agent, policy),
        broker: this.formatBroker(broker),
        insured: this.formatInsured(insured, policyAddress),
        residential: this.formatResidential(residential),
        coverages: coverages,
        benefitsAndSupports: benefitsAndSupports,
        payments: payments,
      },
    };
  }

  private async findBroker() {
    return await this.agentyRepository
      .createQueryBuilder('broker')
      .select('broker.brokerName', 'brokerName')
      .addSelect('broker.susepCode', 'susepCode')
      .addSelect('productAgent.commissionPercentage', 'commissionPercentage')
      .innerJoin('broker.agentType', 'type')
      .innerJoin('broker.productAgent', 'productAgent')
      .where('type.key = :key', { key: AgentTypeEnum.BROKER })
      .getRawOne();
  }

  private async findPolicy(policyId: number): Promise<PolicyEntity> {
    return await this.policyRepository
      .createQueryBuilder('policy')
      .select('policy.ticket')
      .addSelect('policy.luckNumber')
      .addSelect('policy.createdAt')
      .addSelect('policy.startDate')
      .addSelect('policy.endDate')
      .addSelect('policy.totalValue')
      .addSelect('policy.iofValue')
      .addSelect('policy.agentId')
      .addSelect('policy.insuredId')
      .addSelect('policy.addressId')
      .addSelect('policy.planId')
      .where('policy.id = :id', { id: policyId })
      .getOne();
  }

  private async findProduct(planId: number): Promise<ProductEntity> {
    return await this.productRepository
      .createQueryBuilder('product')
      .select('product.id')
      .addSelect('product.description')
      .addSelect('product.branchGroupNumber')
      .addSelect('product.branchNumber')
      .addSelect('product.susepCode')
      .addSelect('product.contractName')
      .addSelect('product.type')
      .innerJoin('product.plans', 'plans')
      .where('plans.id = :id', { id: planId })
      .getOne();
  }

  private async findAgent(agentId: number, productId: number) {
    return await this.agentyRepository
      .createQueryBuilder('agent')
      .select('agent.name', 'name')
      .addSelect('agent.cnpj', 'cnpj')
      .addSelect('productAgent.commissionPercentage', 'commissionPercentage')
      .innerJoin('agent.agentType', 'type')
      .innerJoin('agent.productAgent', 'productAgent')
      .where('type.key = :key', { key: AgentTypeEnum.AGENT })
      .andWhere('agent.id = :agentId', { agentId })
      .andWhere('productAgent.productId = :id', { id: productId })
      .getRawOne();
  }

  private async findPlan(planId: number): Promise<Partial<PlanEntity>> {
    return await this.planRepository
      .createQueryBuilder('plan')
      .select('plan.iofValue')
      .where('plan.id = :planId', { planId })
      .getOne();
  }

  private async findInsured(insuredId: number): Promise<InsuredEntity> {
    return await this.insuredRepository
      .createQueryBuilder('insured')
      .select('insured.name')
      .addSelect('insured.birthDate')
      .addSelect('insured.cpf')
      .addSelect('insured.gender')
      .addSelect('insured.telephone')
      .where('insured.id = :id', { id: insuredId })
      .getOne();
  }

  private async findAddress(addressId: number): Promise<AddressEntity> {
    return await this.addressRepository
      .createQueryBuilder('address')
      .select('address.cep', 'zipCode')
      .addSelect('address.street', 'street')
      .addSelect('address.neighborhood', 'neighborhood')
      .addSelect('address.number', 'houseNumber')
      .addSelect('address.complement', 'complement')
      .addSelect('address.uf', 'state')
      .where('address.id = :id', { id: addressId })
      .getRawOne();
  }

  private async findResidential(policyId: number) {
    return await this.policyResidentialRepository
      .createQueryBuilder('policyResidential')
      .select('housingType.description', 'habitation')
      .addSelect('constructionType.description', 'construction')
      .addSelect('propertyType.description', 'property')
      .innerJoin('policyResidential.property', 'property')
      .innerJoin('property.housingType', 'housingType')
      .innerJoin('property.constructionType', 'constructionType')
      .innerJoin('property.propertyType', 'propertyType')
      .innerJoinAndSelect('policyResidential.address', 'address')
      .where('policyResidential.policyId = :id', { id: policyId })
      .getRawOne();
  }

  private async findCoverages(planId: number): Promise<Coverage[]> {
    const result: Coverage[] = [];

    const coverages = await this.planCoverageRepository
      .createQueryBuilder('planCoverage')
      .select('coverage.title')
      .addSelect('planCoverage.capitalValue')
      .addSelect('planCoverage.prizeValue')
      .addSelect('planCoverage.franchiseText')
      .addSelect('planCoverage.shortageText')
      .innerJoin('planCoverage.coverage', 'coverage')
      .innerJoin('coverage.coverageType', 'coverageType')
      .where('planCoverage.planId = :id', { id: planId })
      .andWhere('coverageType.key = :key', { key: 'coverages' })
      .orderBy('coverage.order')
      .getMany();

    coverages.forEach((coverage) =>
      result.push({
        title: coverage.coverage.title,
        maxLimitIndenization: coverage.capitalValue,
        franchiseText: coverage.franchiseText,
        prizeValue: coverage.prizeValue,
        shortageText: coverage.shortageText,
      }),
    );
    return result;
  }

  private async findBenefitsAndSupports(planId: number): Promise<BenefitsAndSupports[]> {
    const result: BenefitsAndSupports[] = [];

    const benefitsAndSupports = await this.planCoverageRepository
      .createQueryBuilder('planCoverage')
      .select('coverage.title')
      .addSelect('planCoverage.capitalValue')
      .addSelect('planCoverage.generalText')
      .innerJoin('planCoverage.coverage', 'coverage')
      .innerJoin('coverage.coverageType', 'coverageType')
      .where('planCoverage.planId = :id', { id: planId })
      .andWhere('coverageType.key <> :key', { key: 'coverages' })
      .orderBy('coverage.order')
      .getMany();

    benefitsAndSupports.forEach((benefits) =>
      result.push({
        title: benefits.coverage.title,
        capitalValue: benefits.capitalValue,
        generalText: benefits.generalText,
      }),
    );
    return result;
  }

  private async findPayments(policyId: number): Promise<Payment[]> {
    const result: Payment[] = [];

    const payments = await this.installmentRepository
      .createQueryBuilder('installment')
      .select('installment.number')
      .addSelect('installment.dueDate')
      .addSelect('installment.iofValue')
      .addSelect('installment.totalValue')
      .addSelect('installment.agency')
      .addSelect('installment.account')
      .where('installment.policyId = :id', { id: policyId })
      .orderBy('installment.number')
      .getMany();

    payments.forEach((payment) =>
      result.push({
        number: payment.number,
        dueDate: new Date(payment.dueDate),
        iofValue: payment.iofValue,
        totalValue: payment.totalValue,
        agency: payment.agency,
        account: payment.account,
      }),
    );
    return result;
  }

  private formatBroker(broker) {
    return { name: broker.brokerName, susepCode: broker.susepCode };
  }

  private formatAgent(agent, policy) {
    return {
      name: agent.name,
      cnpj: agent.cnpj,
      comissionPercentage: agent.commissionPercentage,
      comissionValue: (policy.totalValue * agent.commissionPercentage) / 100,
    };
  }

  private formatInsured(insured, address) {
    return {
      name: insured.name,
      birthdate: insured.birthDate,
      cpf: insured.cpf,
      gender: insured.gender,
      phoneNumber: insured.telephone,
      address: address,
    };
  }

  private formatProduct(product) {
    return {
      title: product.description,
      group: product.branchGroupNumber.toString() + product.branchNumber.toString(),
      susepCode: product.susepCode?.toString(),
      contractName: product.contractName,
    };
  }

  private formatResidential(residential) {
    if (residential == undefined)
      return {
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
      };

    return {
      habitation: residential.habitation,
      construction: residential.construction,
      property: residential.property,
      address: {
        zipCode: residential.address_cep,
        street: residential.address_rua,
        neighborhood: residential.address_bairro,
        complement: residential.address_complemento,
        houseNumber: residential.address_numero,
        state: residential.address_uf,
      },
    };
  }
}

type Coverage = {
  title: string;
  maxLimitIndenization: number;
  franchiseText: string;
  shortageText: string;
  prizeValue: number;
};

type BenefitsAndSupports = {
  title: string;
  capitalValue?: number;
  generalText?: string;
};

type Payment = {
  number: number;
  dueDate: Date;
  iofValue: number;
  totalValue: number;
  agency: string;
  account: string;
};
