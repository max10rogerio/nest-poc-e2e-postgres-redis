import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class FindPlanDetailsByIdRepository {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
  ) {}

  public async findById(id: number): Promise<FindPlanDetailsByIdRepositoryResponse> {
    const builder = this.plansRepository
      .createQueryBuilder('plan')
      .select()
      .innerJoinAndSelect('plan.product', 'product')
      .innerJoinAndSelect('plan.planCoverage', 'coverages')
      .innerJoinAndSelect('coverages.coverage', 'coverage')
      .innerJoinAndSelect('coverage.coverageType', 'type')
      .where('plan.id = :id', { id })
      .orderBy('type.order', 'ASC')
      .addOrderBy('coverage.order', 'ASC');

    const result = await builder.getOne();

    return result;
  }
}

export type FindPlanDetailsByIdRepositoryResponse = PlanEntity;
