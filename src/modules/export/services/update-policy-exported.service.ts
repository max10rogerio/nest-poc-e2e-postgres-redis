import { Injectable } from '@nestjs/common';
import { UpdatePolicyExportedRepository } from '../repositories';

@Injectable()
export class UpdatePolicyExportedService {
  constructor(private readonly updatePolicyExportedRepository: UpdatePolicyExportedRepository) {}

  public async updatePolicyExported(policiesId: number[], export_id: number): Promise<boolean> {
    return this.updatePolicyExportedRepository.updatePoliciesExported(policiesId, export_id);
  }
}
