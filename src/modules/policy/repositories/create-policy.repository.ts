import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { PolicyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';
import { CreateTicketNumberService } from '../services/create-ticket-number.service';

@Injectable()
export class CreatePolicyRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
    private readonly createNumber: CreateTicketNumberService,
  ) {}

  public async create(params: CreatePolicyRepositoryParams): Promise<CreatePolicyRepositoryResponse> {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

    const newPolicy = await this.policyRepository.save({
      insuredId: params.insuredId,
      luckNumber: params.luckNumber,
      contractDate: dayjs().format(DATE_FORMAT),
      startDate: dayjs().format(DATE_FORMAT),
      endDate: dayjs().add(1, 'year').format(DATE_FORMAT),
      ticket: '',
      agentId: params.agentId,
      planId: params.planId,
      addressId: params.addressId,
      status: PolicyStatusEnum.ISSUED,
      totalValue: params.totalValue,
      liquidValue: params.liquidValue,
      iofValue: params.iofValue,
    });

    const ticket = this.createNumber.createTicketNumber(params.contractNumber, newPolicy.id);

    await this.policyRepository.update(newPolicy.id, { ticket });

    newPolicy.ticket = ticket;

    return newPolicy;
  }
}

export type CreatePolicyRepositoryResponse = PolicyEntity;

export type CreatePolicyRepositoryParams = {
  luckNumber: number;
  contractNumber: number;
  planId: number;
  agentId: number;
  insuredId: number;
  addressId: number;
  totalValue: number;
  liquidValue: number;
  iofValue: number;
};
