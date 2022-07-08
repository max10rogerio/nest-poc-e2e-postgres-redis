import { Injectable } from '@nestjs/common';
import BigJS from 'big.js';
import { ResidentialParamsRequired } from 'src/errors';
import { CreateAddressService, CreateAddressServiceParams } from 'src/modules/address/services';
import { MakePaymentService } from 'src/modules/gateway-lydians/services';
import { CreateInsuredRepositoryParams } from 'src/modules/insured/repositories';
import { FindPlanDetailsByIdRepositoryResponse } from 'src/modules/plans/repositories';
import { FindPlanDetailsByIdService } from 'src/modules/plans/services';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { toDecimal } from 'src/utils';
import { CreateLuckyNumberService } from '../../lottery/services';
import { AgentTypeEnum } from '../constants';
import {
  CreatePolicyRepository,
  CreatePolicyRepositoryResponse,
  GetContractNumberAgentRepository,
} from '../repositories';
import { PolicyCreateInstallmentsService } from './policy-create-installments.service';
import { PolicySaveOrLoadInsuredService } from './policy-save-or-load-insured.service';
import { PolicySaveResidentialDataService } from './policy-save-residental-data.service';

@Injectable()
export class CreatePolicyService {
  constructor(
    private readonly getContractNumberAgent: GetContractNumberAgentRepository,
    private readonly createPolicyRepository: CreatePolicyRepository,
    private readonly createLuckyNumberService: CreateLuckyNumberService,
    private readonly makePaymentService: MakePaymentService,
    private readonly findPlanDetailsByIdService: FindPlanDetailsByIdService,
    private readonly policySaveOrLoadInsuredService: PolicySaveOrLoadInsuredService,
    private readonly policyCreateInstallmentsService: PolicyCreateInstallmentsService,
    private readonly policySaveResidentialDataService: PolicySaveResidentialDataService,
    private readonly createAddressService: CreateAddressService,
  ) {}

  public async createPolicy(params: CreatePolicyServiceParams): Promise<CreatePolicyServiceResponse> {
    const plan = await this.findPlanDetailsByIdService.findById(params.planId);

    if (plan.product.type === ProductTypeEnum.RESIDENTIAL && !params.residential) {
      throw new ResidentialParamsRequired();
    }

    const payment = await this.makePaymentService.makePayment({
      account_number: +params.account.accountNumber,
      agency_code: +params.account.agencyCode,
      cpf: params.insured.cpf,
      description: this.makePaymentDescription(plan),
      value: plan.prizeValue,
    });

    const insured = await this.policySaveOrLoadInsuredService.saveOrLoad(params.insured);
    const address = await this.createAddressService.create(params.address);
    const policy = await this.savePolicy(plan, insured.id, address.id);

    const [installment] = await this.policyCreateInstallmentsService.create(params, plan, payment, policy);

    if (plan.product.type === ProductTypeEnum.RESIDENTIAL) {
      await this.policySaveResidentialDataService.save(params.residential, policy.id, address.id);
    }

    return {
      policyId: policy.id,
      ticket: policy.ticket,
      luckNumber: policy.luckNumber,
      planName: plan.product.description,
      startDate: policy.startDate,
      endDate: policy.endDate,
      liquidValue: installment.liquidValue,
      iofValue: installment.iofValue,
      totalValue: installment.totalValue,
    };
  }

  private async savePolicy(
    plan: FindPlanDetailsByIdRepositoryResponse,
    insuredId: number,
    addressId: number,
  ): Promise<CreatePolicyRepositoryResponse> {
    const { contractNumber, agentId } = await this.getContractNumberAgent.getProductAgent(plan.id, AgentTypeEnum.AGENT);
    const luckNumber = await this.createLuckyNumberService.createLuckyNumber();

    const policy = await this.createPolicyRepository.create({
      contractNumber,
      luckNumber,
      agentId,
      insuredId,
      planId: plan.id,
      addressId,
      totalValue: this.calculateTotalValue(plan.prizeValue, plan.numberInstallments),
      iofValue: this.calculateIOFValue(plan.prizeValue, plan.iofValue, plan.numberInstallments),
      liquidValue: this.calculateLiquidValue(plan.prizeValue, plan.iofValue, plan.numberInstallments),
    });

    return policy;
  }

  private makePaymentDescription(plan: FindPlanDetailsByIdRepositoryResponse): string {
    return `${plan.product.description} - 1/${plan.numberInstallments}`;
  }

  public calculateTotalValue(planValue: number, numberInstallments: number) {
    const totalValue = new BigJS(planValue).mul(numberInstallments).round(2).toNumber();

    return totalValue;
  }

  public calculateLiquidValue(planValue: number, iofPercent: number, numberInstallments: number): number {
    const valueWithoutIOF = new BigJS(this.calculateTotalValue(planValue, numberInstallments))
      .div(toDecimal(iofPercent))
      .round(2)
      .toNumber();

    return valueWithoutIOF;
  }

  public calculateIOFValue(planValue: number, iofPercent, numberInstallments: number): number {
    const iofValue = new BigJS(this.calculateTotalValue(planValue, numberInstallments))
      .minus(this.calculateLiquidValue(planValue, iofPercent, numberInstallments))
      .round(2)
      .toNumber();

    return iofValue;
  }
}

export type CreatePolicyServiceParams = {
  planId: number;
  insured: CreateInsuredRepositoryParams;
  address: CreateAddressServiceParams;
  residential?: {
    habitationId: number;
    constructionId: number;
    propertyId: number;
    address?: CreateAddressServiceParams;
  };
  account: {
    agencyCode: string;
    accountNumber: string;
  };
};

export type CreatePolicyServiceResponse = {
  policyId: number;
  planName: string;
  startDate: Date;
  endDate: Date;
  totalValue: number;
  liquidValue: number;
  iofValue: number;
  ticket: string;
  luckNumber: number;
};
