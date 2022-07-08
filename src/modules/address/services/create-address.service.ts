import { Injectable } from '@nestjs/common';
import { CreateAddressRepository, CreateAddressRepositoryResponse } from '../repositories';

@Injectable()
export class CreateAddressService {
  constructor(private readonly createAddressRepository: CreateAddressRepository) {}

  public async create(params: CreateAddressServiceParams): Promise<CreateAddressServiceResponse> {
    return this.createAddressRepository.create({
      ...params,
      cep: params.zipCode,
      number: params.houseNumber,
      uf: params.state,
    });
  }
}

export type CreateAddressServiceResponse = CreateAddressRepositoryResponse;

export type CreateAddressServiceParams = {
  zipCode: string;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
};
