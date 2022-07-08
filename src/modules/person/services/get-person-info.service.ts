import { Injectable } from '@nestjs/common';
import { PersonNotFound } from 'src/errors';
import { GetUserInfoRepository, GetUserInfoRepositoryResponse } from 'src/modules/apolo/repositories';
import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';

@Injectable()
export class GetPersonInfoService {
  constructor(private readonly getUserInfoRepository: GetUserInfoRepository) {}

  public async getPersonByCPF(cpf: string): Promise<Partial<GetPersonInfoServiceResponse>> {
    const person = await this.getUserInfoRepository.getUserInfo(cpf);

    if (!person) throw new PersonNotFound(cpf);

    const response = this.makeResponse(person);

    this.applyNullInFalsyFields(response);

    return response;
  }

  private applyNullInFalsyFields(params: GetPersonInfoServiceResponse) {
    Object.keys(params).forEach((key) => {
      params[key] = params[key] || null;
    });
  }

  private makeResponse(params: GetUserInfoRepositoryResponse): GetPersonInfoServiceResponse {
    return {
      name: params.name,
      sex: GenderEnum[params.sex],
      birthdate: params.birth?.birthdate,
      cpf: params.cpf,
      maritalStatus: MaritalStatusEnum[params.marital_status],
      address: this.makeAddress(params.residencial_address),
      contact: this.makeContact(params.personal_contact),
    };
  }

  private makeContact(
    params: GetUserInfoRepositoryResponse['personal_contact'],
  ): GetPersonInfoServiceResponse['contact'] {
    return {
      email: params?.email,
      phoneNumber: params?.phone_number,
      alternativePhoneNumber: params?.alternative_phone_number,
    };
  }

  private makeAddress(
    address: GetUserInfoRepositoryResponse['residencial_address'],
  ): GetPersonInfoServiceResponse['address'] {
    if (!address) return undefined;

    return {
      neighborhood: address.neighborhood,
      street: address.street,
      houseNumber: address.house_number,
      complement: address.complement,
      zipCode: address.cep,
      city: address.city.name,
      state: address.city.state.initials,
    };
  }
}

export type GetPersonInfoServiceResponse = {
  name: string;
  sex: GenderEnum;
  birthdate: string;
  cpf: string;
  maritalStatus: MaritalStatusEnum;
  address?: {
    zipCode: string;
    street: string;
    houseNumber: string;
    neighborhood: string;
    complement: string;
    city: string;
    state: string;
  };
  contact?: {
    phoneNumber: string;
    alternativePhoneNumber: string;
    email: string;
  };
};
