import { Injectable } from '@nestjs/common';
import BigJS from 'big.js';
import * as dayjs from 'dayjs';
import { MakePaymentServiceResponse } from 'src/modules/gateway-lydians/services';
import { FindPlanDetailsByIdRepositoryResponse } from 'src/modules/plans/repositories';
import { InstallmentStatusEnum } from '../constants';
import { CreateInstallmentRepositoryParams, CreatePolicyRepositoryResponse } from '../repositories';
import { CreateInstallmentService, CreateInstallmentServiceResponse } from './create-installment.service';
import { CreatePolicyServiceParams } from './create-policy.service';

@Injectable()
export class PolicyCreateInstallmentsService {
  constructor(private readonly createInstallmentService: CreateInstallmentService) {}

  public async create(
    params: CreatePolicyServiceParams,
    plan: FindPlanDetailsByIdRepositoryResponse,
    payment: MakePaymentServiceResponse,
    policy: CreatePolicyRepositoryResponse,
  ): Promise<CreateInstallmentServiceResponse> {
    const installments = this.makeArrayOfInstallments(params, plan, payment, policy);
    return this.createInstallmentService.createInstallment(installments);
  }

  private makeArrayOfInstallments(
    params: CreatePolicyServiceParams,
    plan: FindPlanDetailsByIdRepositoryResponse,
    payment: MakePaymentServiceResponse,
    policy: CreatePolicyRepositoryResponse,
  ): CreateInstallmentRepositoryParams[] {
    const FIRST_ATTEMP = 1;

    return Array(plan.numberInstallments)
      .fill(0)
      .map<CreateInstallmentRepositoryParams>((_v, index) => {
        const isFirstInstallment = index === 0;

        return {
          attempts: isFirstInstallment ? FIRST_ATTEMP : 0,
          number: index + 1,
          policyId: policy.id,
          iofValue: this.calculateIOFValue(plan.prizeValue, policy.liquidValue, index + 1, plan.numberInstallments),
          totalValue: plan.prizeValue,
          liquidValue: this.calculateLiquidValue(policy.liquidValue, index + 1, plan.numberInstallments),
          agency: params.account.agencyCode,
          account: params.account.accountNumber,
          paymentId: isFirstInstallment ? payment.paymentId : null,
          requestId: isFirstInstallment ? payment.requestId : null,
          transactionCode: isFirstInstallment ? payment.transactionId : null,
          status: isFirstInstallment ? InstallmentStatusEnum.PAID : InstallmentStatusEnum.PENDING,
          dueDate: dayjs().add(index, 'months').format('YYYY-MM-DD 12:00:00'),
        };
      });
  }

  public calculateLiquidValue(liquidValueTotal: number, numberInstallment: number, numberInstallments: number): number {
    const rest = new BigJS(liquidValueTotal).mul(100).mod(numberInstallments).toNumber();

    let valueWithoutIOF = new BigJS(Math.floor(new BigJS(liquidValueTotal).mul(100).div(numberInstallments).toNumber()))
      .div(100)
      .toNumber();

    if (numberInstallment <= rest) {
      valueWithoutIOF = new BigJS(valueWithoutIOF).add(0.01).toNumber();
    }

    return valueWithoutIOF;
  }

  public calculateIOFValue(
    planValue: number,
    liquidValueTotal: number,
    numberInstallment: number,
    numberInstallments: number,
  ): number {
    const iofValue = new BigJS(planValue)
      .minus(this.calculateLiquidValue(liquidValueTotal, numberInstallment, numberInstallments))
      .toNumber();

    return iofValue;
  }
}
