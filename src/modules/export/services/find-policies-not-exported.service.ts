import { Injectable } from '@nestjs/common';
import {
  FindPoliciesNotExportedRepository,
  FindPoliciesNotExportedRepositoryResponse,
} from '../repositories/find-policies-not-exported.repository';

@Injectable()
export class FindPoliciesNotExportedService {
  constructor(private readonly findPoliciesNotExportedRepository: FindPoliciesNotExportedRepository) {}

  public async findPoliciesNotExportedResidential(): Promise<FindPoliciesNotExportedRepositoryResponse> {
    return this.findPoliciesNotExportedRepository.findPoliciesNotExportedResidential();
  }

  public async findPoliciesNotExportedDIH(): Promise<FindPoliciesNotExportedRepositoryResponse> {
    return this.findPoliciesNotExportedRepository.findPoliciesNotExportedDIH();
  }
}
