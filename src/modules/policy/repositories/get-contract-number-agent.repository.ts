import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentEntity, AgentTypeEntity, PlanEntity, ProductAgentEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';
import { AgentTypeEnum } from '../constants';

@Injectable()
export class GetContractNumberAgentRepository {
  constructor(
    @InjectRepository(ProductAgentEntity)
    private readonly productAgentRepository: Repository<ProductAgentEntity>,
  ) {}

  public async getProductAgent(
    planId: number,
    agentType: AgentTypeEnum,
  ): Promise<GetContractNumberAgentByKeyRepositoryResponse> {
    const query = this.productAgentRepository
      .createQueryBuilder('productAgent')
      .select()
      .innerJoin(AgentEntity, 'agent', 'agent.id = productAgent.agentId')
      .innerJoin(AgentTypeEntity, 'type', 'type.id = agent.agentTypeId')
      .innerJoin(PlanEntity, 'plan', 'plan.productId = productAgent.productId')
      .where('type.key = :key', { key: agentType })
      .andWhere('plan.id = :planId', { planId: planId });

    return await query.getOne();
  }
}

export type GetContractNumberAgentByKeyRepositoryResponse = ProductAgentEntity;
