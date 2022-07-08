import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class UpdatePolicyExportedRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
  ) {}

  public async updatePoliciesExported(policies_id: number[], export_id: number): Promise<boolean> {
    await this.policyRepository
      .createQueryBuilder('policy')
      .update<PolicyEntity>(PolicyEntity, { exportId: export_id })
      .where('id IN (' + policies_id + ')')
      .execute();

    return true;
  }
}
