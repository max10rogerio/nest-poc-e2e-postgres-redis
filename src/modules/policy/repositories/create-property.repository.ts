import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CreatePropertyRepository {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  public async create(params: CreatePropertyRepositoryParams): Promise<CreatePropertyRepositoryResponse> {
    return this.propertyRepository.save(params);
  }
}

export type CreatePropertyRepositoryParams = Partial<PropertyEntity>;
export type CreatePropertyRepositoryResponse = PropertyEntity;
