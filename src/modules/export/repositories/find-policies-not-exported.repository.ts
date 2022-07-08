import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants/policy-status.constant';
import { PolicyEntity } from 'src/modules/database/models';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class FindPoliciesNotExportedRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
  ) {}

  public async findPoliciesNotExportedResidential(): Promise<FindPoliciesNotExportedRepositoryResponse> {
    return await this.createQueryBuilderCommon()
      .innerJoinAndSelect('policy.policiesResidential', 'policiesResidential')
      .innerJoinAndSelect('policiesResidential.address', 'addressRisk')
      .andWhere('product.tipo = :tipo ', { tipo: ProductTypeEnum.RESIDENTIAL })
      .getMany();
  }

  public async findPoliciesNotExportedDIH(): Promise<FindPoliciesNotExportedRepositoryResponse> {
    return await this.createQueryBuilderCommon()
      .andWhere('product.tipo = :tipo ', {
        tipo: ProductTypeEnum.DEFAULT,
      })
      .getMany();
  }

  private createQueryBuilderCommon(): SelectQueryBuilder<PolicyEntity> {
    return this.policyRepository
      .createQueryBuilder('policy')
      .select()
      .innerJoinAndSelect('policy.plan', 'plan')
      .innerJoin('plan.product', 'product')
      .innerJoinAndSelect('policy.insured', 'insured')
      .innerJoinAndSelect('policy.address', 'insuredAddress')
      .leftJoin('policy.export', 'export')
      .where('policy.status = :status', { status: PolicyStatusEnum.ISSUED })
      .andWhere('(policy.exportacao_id is null or export.status = :statusRoutine)', {
        statusRoutine: StatusEnum.ERROR,
      });
  }
}

export type FindPoliciesNotExportedRepositoryResponse = PolicyEntity[];
