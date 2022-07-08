import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstallmentEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CreateInstallmentRepository {
  constructor(
    @InjectRepository(InstallmentEntity)
    private readonly installmentRepository: Repository<InstallmentEntity>,
  ) {}

  public async createInstallment(
    params: CreateInstallmentRepositoryParams,
  ): Promise<CreateInstallmentRepositoryResponse> {
    return this.installmentRepository.save(params);
  }
}

export type CreateInstallmentRepositoryParams = Partial<InstallmentEntity>;
export type CreateInstallmentRepositoryResponse = InstallmentEntity;
