import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsuredEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class FindInsuredByCPFRepository {
  constructor(
    @InjectRepository(InsuredEntity)
    private readonly insuredRepository: Repository<InsuredEntity>,
  ) {}

  public async findByCPF(cpf: string): Promise<FindInsuredByCPFRepositoryResponse> {
    const builder = this.insuredRepository.createQueryBuilder('insured').select().where('cpf = :cpf', { cpf });

    const result = await builder.getOne();
    return result;
  }
}

export type FindInsuredByCPFRepositoryResponse = InsuredEntity;
