import { Injectable } from '@nestjs/common';
import { FindAllPlansByProduct, FindAllPlansByProductRepositoryResponse } from '../repositories';

@Injectable()
export class FindAllPlansByProductService {
  constructor(private readonly findAllPlansByProduct: FindAllPlansByProduct) {}

  public async findAllPlans(product_id: number): Promise<FindAllPlansByProductServiceResponse> {
    return this.findAllPlansByProduct.findAllPlansByProduct(product_id);
  }
}

export type FindAllPlansByProductServiceResponse = FindAllPlansByProductRepositoryResponse;
