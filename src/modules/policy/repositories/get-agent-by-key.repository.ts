import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentEntity, AgentTypeEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';
import { AgentTypeEnum } from '../constants';

@Injectable()
export class GetAgentByKeyRepository {
  constructor(
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>,
  ) {}

  public async getByKey(param: AgentTypeEnum): Promise<GetAgentByKeyRepositoryResponse> {
    const builder = this.agentRepository
      .createQueryBuilder('agent')
      .select()
      .innerJoin(AgentTypeEntity, 'type', 'type.id = agent.agentTypeId')
      .where('type.key = :key', { key: param });

    const agent = await builder.getOne();

    return agent;
  }
}

export type GetAgentByKeyRepositoryResponse = AgentEntity;
