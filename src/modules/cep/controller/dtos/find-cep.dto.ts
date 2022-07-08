import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';
import { FindCepServiceResponse } from '../../services';

export class FindCepParamsDTO {
  @ApiProperty({
    default: '87060420',
  })
  @IsNumberString()
  @Length(8, 8)
  cep: string;
}

export class FindCepResponseDTO {
  @ApiProperty()
  cep: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  neighborhood: string;

  toDTO(params: FindCepServiceResponse): FindCepResponseDTO {
    const dto = new FindCepResponseDTO();

    dto.cep = params.cep;
    dto.city = params.city;
    dto.neighborhood = params.neighborhood;
    dto.state = params.state;
    dto.street = params.street;

    return dto;
  }
}
