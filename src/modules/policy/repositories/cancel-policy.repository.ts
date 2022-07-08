import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { PolicyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CancelPolicyRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
  ) {}

  public async cancel(id: number, coverageEndDate: Date): Promise<CancelPolicyRepositoryResponse> {
    await this.policyRepository
      .createQueryBuilder()
      .update(PolicyEntity)
      .set({
        status: PolicyStatusEnum.CANCELLED,
        cancellationDate: new Date(),
        coverageEndDate: coverageEndDate,
      })
      .where('id = :id', { id })
      .execute();

    return await this.policyRepository
      .createQueryBuilder()
      .select('id')
      .addSelect('status')
      .addSelect('data_cancelamento', 'cancellationDate')
      .addSelect('data_fim_cobertura', 'coverageEndDate')
      .where('id = :id', { id })
      .getRawOne();
  }
}

export type CancelPolicyRepositoryResponse = {
  id: number;
  cancellationDate?: Date;
  coverageEndDate?: Date;
  status: PolicyStatusEnum;
};
