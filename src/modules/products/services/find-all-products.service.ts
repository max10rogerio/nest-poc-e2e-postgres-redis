import { Injectable } from '@nestjs/common';
import { FindAllProductsRepositoryResponse, FindAllProductsWithLowestPlanPrice } from '../repositories';

@Injectable()
export class FindAllProductsService {
  constructor(private readonly findAllProductsWithLowestPlanPrice: FindAllProductsWithLowestPlanPrice) {}

  public async findAll(): Promise<FindAllProductsServiceResponse> {
    return this.findAllProductsWithLowestPlanPrice.findAll();
  }
}

export type FindAllProductsServiceResponse = FindAllProductsRepositoryResponse;
