import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { InsuredEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CreateInsuredRepository {
  constructor(
    @InjectRepository(InsuredEntity)
    private readonly insuredRepository: Repository<InsuredEntity>,
  ) {}

  public async createInsured(params: CreateInsuredRepositoryParams): Promise<CreateInsuredRepositoryResponse> {
    const newInsured = await this.insuredRepository.save({
      cpf: params.cpf,
      name: params.name,
      email: params.email,
      gender: params.gender,
      birthDate: params.birthdate,
      telephone: params.phoneNumber,
      maritalStatus: params.maritalStatus,
    });

    return newInsured;
  }
}

type Insured = {
  cpf: string;
  name: string;
  birthdate: string;
  gender: GenderEnum;
  maritalStatus: MaritalStatusEnum;
  phoneNumber: string;
  email: string;
};

export type CreateInsuredRepositoryParams = Insured;
export type CreateInsuredRepositoryResponse = InsuredEntity;
