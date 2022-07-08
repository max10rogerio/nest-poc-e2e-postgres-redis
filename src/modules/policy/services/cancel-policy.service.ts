import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { PolicyCancelled } from 'src/errors';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { PolicyEntity } from 'src/modules/database/models';
import { GetPaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { MakeChargebackPaymentService } from 'src/modules/gateway-lydians/services';
import { SendPolicyCancellationEmailPublisher } from 'src/modules/queue/mail';
import { DAYS_FOR_CHARGEBACK, MONTH_FOR_END_COVERAGE } from '../constants';
import {
  CancelInstallmentRepository,
  CancelPolicyRepository,
  CancelPolicyRepositoryResponse,
  FindLastInstallmentPaidRepository,
} from '../repositories';
import { FindPolicyByIdService, FindPolicyByIdServiceResponse } from './find-policy-by-id.service';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

@Injectable()
export class CancelPolicyService {
  constructor(
    private readonly makeChargebackPaymentService: MakeChargebackPaymentService,
    private readonly cancelPolicyRepository: CancelPolicyRepository,
    private readonly cancelInstallmentRepository: CancelInstallmentRepository,
    private readonly findPolicyByIdService: FindPolicyByIdService,
    private readonly getPaymentRepository: GetPaymentRepository,
    private readonly sendMailCancellationPolicy: SendPolicyCancellationEmailPublisher,
    private readonly findLastInstallmentPaidRepository: FindLastInstallmentPaidRepository,
  ) {}

  public async cancelPolicy(policyId: number): Promise<CancelPolicyServiceResponse> {
    const policy = await this.findPolicyByIdService.findById(policyId);

    this.validatePolicy(policy);

    if (this.mustChargeback(policy)) {
      return this.makeCancellWithChargeback(policy);
    }
    return this.makeCancel(policy);
  }

  private mustChargeback(policy: PolicyEntity): boolean {
    return dayjs(policy.startDate).add(DAYS_FOR_CHARGEBACK, 'days').isSameOrAfter(dayjs());
  }

  private async makeCancellWithChargeback(policy: FindPolicyByIdServiceResponse): Promise<CancelPolicyServiceResponse> {
    const { idLydians, value } = await this.getPaymentRepository.getPaymentByInstallment(policy.installment.paymentId);

    await this.makeChargebackPaymentService.makeChargeBackPayment({
      cpf: policy.insured.cpf,
      financialPostingId: idLydians,
      value: value,
    });
    await this.cancelInstallmentRepository.cancelInstallmentWithChargeback(policy.id);
    const policyCancelled = await this.cancelPolicyRepository.cancel(policy.id, new Date());

    await this.sendMailCancellationPolicy.send({
      titleHeader: 'Estorno de pagamento de seguro foi realizado',
      ticketNumber: policy.ticket,
      name: policy.insured.name,
      insurance: policy.plan.description,
      cancellationDate: policyCancelled.cancellationDate,
    });

    return policyCancelled;
  }

  private async makeCancel(policy: PolicyEntity): Promise<CancelPolicyServiceResponse> {
    await this.cancelInstallmentRepository.cancelInstallmentNoChargeback(policy.id);
    const endCoverageDate = await this.getEndCoverageDate(policy.id);
    return await this.cancelPolicyRepository.cancel(policy.id, endCoverageDate);
  }

  private async getEndCoverageDate(policyId: number): Promise<Date> {
    const { dueDate } = await this.findLastInstallmentPaidRepository.findByPolicyId(policyId);
    return dayjs(dueDate).add(MONTH_FOR_END_COVERAGE, 'month').toDate();
  }

  private validatePolicy(policy: PolicyEntity) {
    if (policy.status == PolicyStatusEnum.CANCELLED) {
      throw new PolicyCancelled();
    }
  }
}

export type CancelPolicyServiceResponse = CancelPolicyRepositoryResponse;
