import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity, ProductEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllProductsWithLowestPlanPrice {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  public async findAll(): Promise<FindAllProductsRepositoryResponse> {
    const builder = this.productsRepository
      .createQueryBuilder('products')
      .select('products.id', 'id')
      .addSelect('products.description', 'description')
      .addSelect('products.icon', 'icon')
      .addSelect('products.termsPDF', 'termsPDF')
      .addSelect('MIN(plans.prizeValue)::float', 'planMinPrizeValue')
      .addSelect('COUNT(plans.id)::integer', 'plansQuantity')
      .innerJoin(PlanEntity, 'plans', 'plans.productId = products.id')
      .groupBy('products.id')
      .orderBy('products.order', 'ASC');

    const result = await builder.getRawMany();

    return result;
  }
}

type Result = {
  id: number;
  description: string;
  icon: string;
  planMinPrizeValue: number;
  plansQuantity: number;
  termsPDF: string;
};

export type FindAllProductsRepositoryResponse = Result[];
