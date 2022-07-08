import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import * as dayjs from 'dayjs';
import { CreateAddressServiceParams } from 'src/modules/address/services';
import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { CreatePolicyServiceParams, CreatePolicyServiceResponse } from '../../services';

export class AddressDTO {
  @ApiProperty()
  @IsString()
  @Length(8, 8)
  zip_code: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  house_number: string;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement?: string;
}

export class InsuredDTO {
  @ApiProperty()
  @IsNumberString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty()
  @IsString()
  @Length(3)
  name: string;

  @ApiProperty()
  @IsDateString()
  birthdate: string;

  @ApiProperty()
  @IsNumberString()
  @Length(11, 13)
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({ enum: MaritalStatusEnum })
  @IsEnum(MaritalStatusEnum)
  marital_status: MaritalStatusEnum;
}

export class AccountDTO {
  @ApiProperty()
  @IsNumber()
  agency_code: number;

  @ApiProperty()
  @IsNumberString()
  account_number: string;
}

export class ResidentialDTO {
  @ApiProperty()
  @IsNumber()
  habitation_id: number;

  @ApiProperty()
  @IsNumber()
  construction_id: number;

  @ApiProperty()
  @IsNumber()
  property_id: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDTO)
  address?: AddressDTO;
}

export class CreatePolicyParamsDTO {
  @ApiProperty()
  @IsNumber()
  plan_id: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => InsuredDTO)
  @IsNotEmptyObject()
  insured: InsuredDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AccountDTO)
  @IsNotEmptyObject()
  account: AccountDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDTO)
  @IsNotEmptyObject()
  address: AddressDTO;

  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  @Type(() => ResidentialDTO)
  residential?: ResidentialDTO;

  toParams(params: CreatePolicyParamsDTO): CreatePolicyServiceParams {
    const {
      account,
      insured: { ...person },
      residential,
      plan_id,
      address,
    } = params;

    return {
      planId: plan_id,
      insured: {
        cpf: person.cpf,
        name: person.name,
        birthdate: person.birthdate,
        email: person.email,
        gender: person.gender,
        maritalStatus: person.marital_status,
        phoneNumber: person.phoneNumber,
      },
      account: {
        accountNumber: account.account_number,
        agencyCode: account.agency_code.toString(),
      },
      residential: this.makeResidentialParams(residential),
      address: this.makeAddressParams(address),
    };
  }

  private makeAddressParams(address: AddressDTO): CreateAddressServiceParams {
    return {
      city: address.city,
      complement: address.complement,
      houseNumber: address.house_number,
      neighborhood: address.neighborhood,
      state: address.state,
      street: address.street,
      zipCode: address.zip_code,
    };
  }

  private makeResidentialParams(
    params: CreatePolicyParamsDTO['residential'],
  ): CreatePolicyServiceParams['residential'] | undefined {
    if (!params) return undefined;

    return {
      constructionId: params.construction_id,
      habitationId: params.habitation_id,
      propertyId: params.property_id,
      address: this.makeResidentialAddressParams(params.address),
    };
  }

  private makeResidentialAddressParams(
    address: CreatePolicyParamsDTO['residential']['address'],
  ): CreatePolicyServiceParams['residential']['address'] {
    if (!address) return undefined;

    return this.makeAddressParams(address);
  }
}

export class CreatePolicyResponseDTO {
  @ApiProperty({ description: 'Policy id' })
  id: number;

  @ApiProperty()
  plan_name: string;

  @ApiProperty()
  ticket: string;

  @ApiProperty()
  luck_number: number;

  @ApiProperty()
  start_date: string;

  @ApiProperty()
  end_date: string;

  @ApiProperty()
  iof_value: number;

  @ApiProperty()
  liquid_value: number;

  @ApiProperty()
  total_value: number;

  toDTO(params: CreatePolicyServiceResponse): CreatePolicyResponseDTO {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

    const dto = new CreatePolicyResponseDTO();

    dto.id = params.policyId;
    dto.plan_name = params.planName;
    dto.luck_number = params.luckNumber;
    dto.ticket = params.ticket;
    dto.start_date = dayjs(params.startDate).format(DATE_FORMAT);
    dto.end_date = dayjs(params.endDate).format(DATE_FORMAT);
    dto.iof_value = params.iofValue;
    dto.liquid_value = params.liquidValue;
    dto.total_value = params.totalValue;

    return dto;
  }
}
