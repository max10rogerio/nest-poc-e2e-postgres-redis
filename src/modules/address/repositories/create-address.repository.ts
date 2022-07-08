import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CreateAddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  public async create(params: CreateAddressRepositoryParams): Promise<CreateAddressRepositoryResponse> {
    return this.addressRepository.save(params);
  }
}

export type CreateAddressRepositoryParams = Partial<AddressEntity>;
export type CreateAddressRepositoryResponse = AddressEntity;
