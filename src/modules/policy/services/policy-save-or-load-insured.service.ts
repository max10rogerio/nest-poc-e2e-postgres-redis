import { Injectable } from '@nestjs/common';
import { CreateInsuredRepositoryParams } from 'src/modules/insured/repositories';
import {
  CreateInsuredService,
  FindInsuredByCPFService,
  FindInsuredByCPFServiceResponse,
} from 'src/modules/insured/services';

@Injectable()
export class PolicySaveOrLoadInsuredService {
  constructor(
    private readonly findInsuredByCPFService: FindInsuredByCPFService,
    private readonly createInsuredService: CreateInsuredService,
  ) {}

  public async saveOrLoad(params: PolicySaveOrLoadInsuredServiceParams): Promise<FindInsuredByCPFServiceResponse> {
    let insured: FindInsuredByCPFServiceResponse | null = await this.findInsuredByCPFService
      .findByCPF(params.cpf)
      .catch(() => null);

    if (!insured) {
      insured = await this.createInsuredService.create(params);
    }

    return insured;
  }
}

export type PolicySaveOrLoadInsuredServiceParams = CreateInsuredRepositoryParams;
export type PolicySaveOrLoadInsuredServiceResponse = FindInsuredByCPFServiceResponse;
