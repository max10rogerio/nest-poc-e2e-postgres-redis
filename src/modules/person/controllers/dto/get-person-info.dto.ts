import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { GetPersonInfoServiceResponse } from '../../services/get-person-info.service';

export class GetPersonInfoParamsDTO {
  @ApiProperty({
    default: '76073667418',
  })
  @IsNumberString()
  cpf: string;
}

export class AddressDTO {
  @ApiProperty()
  zip_code: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  house_number: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class ContactDTO {
  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  alternative_phone_number: string;

  @ApiProperty()
  email: string;
}

export class GetPersonInfoResponseDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  sex: GenderEnum;

  @ApiProperty()
  birthdate: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  marital_status: MaritalStatusEnum;

  @ApiProperty()
  address: AddressDTO;

  @ApiProperty()
  contact: ContactDTO;

  toDTO(params: Partial<GetPersonInfoServiceResponse>): GetPersonInfoResponseDTO {
    const { address, contact, ...infos } = params;
    const dto = new GetPersonInfoResponseDTO();

    dto.name = infos.name;
    dto.sex = infos.sex;
    dto.cpf = infos.cpf;
    dto.birthdate = infos.birthdate;
    dto.marital_status = infos.maritalStatus;

    if (address) {
      const addressDTO = new AddressDTO();

      addressDTO.city = address.city;
      addressDTO.complement = address.complement;
      addressDTO.house_number = address.houseNumber;
      addressDTO.neighborhood = address.neighborhood;
      addressDTO.state = address.state;
      addressDTO.street = address.street;
      addressDTO.zip_code = address.zipCode;

      dto.address = addressDTO;
    } else {
      dto.address = null;
    }

    if (contact) {
      const contactDTO = new ContactDTO();

      contactDTO.email = contact.email;
      contactDTO.phone_number = contact.phoneNumber;
      contactDTO.alternative_phone_number = contact.alternativePhoneNumber;

      dto.contact = contactDTO;
    } else {
      dto.contact = null;
    }

    return dto;
  }
}
