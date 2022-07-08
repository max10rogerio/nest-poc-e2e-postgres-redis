import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllPlansByProduct {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
  ) {}

  public async findAllPlansByProduct(product_id: number): Promise<FindAllPlansByProductRepositoryResponse> {
    const builder = this.plansRepository
      .createQueryBuilder('plan')
      .innerJoin('plan.product', 'product')
      .where('plan.productId = :productId', { productId: product_id })
      .orderBy('plan.prizeValue', 'ASC');

    const result = await builder.getMany();

    return result;
  }
}

export type FindAllPlansByProductRepositoryResponse = PlanEntity[];
