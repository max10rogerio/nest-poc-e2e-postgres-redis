import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import * as dayjs from 'dayjs';
import { makeFileURL } from 'src/config';
import { FindPolicyByIdServiceResponse } from '../../services';

export class FindPolicyByIdParamsDTO {
  @ApiProperty({ description: 'Id da apólice' })
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}

export class FindPolicyByIdResponseDTO {
  @ApiProperty({ description: 'Policy id' })
  id: number;

  @ApiProperty({ nullable: true })
  icon: string;

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

  @ApiProperty({ description: 'URL para o PDF do bilhete' })
  ticket_url: string;

  toDTO(params: FindPolicyByIdServiceResponse, domain: string): FindPolicyByIdResponseDTO {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

    const dto = new FindPolicyByIdResponseDTO();

    dto.id = params.id;
    dto.plan_name = params.plan.description;
    dto.luck_number = params.luckNumber;
    dto.ticket = params.ticket;
    dto.start_date = dayjs(params.startDate).format(DATE_FORMAT);
    dto.end_date = dayjs(params.endDate).format(DATE_FORMAT);
    dto.iof_value = params.installment.iofValue;
    dto.liquid_value = params.installment.liquidValue;
    dto.total_value = params.installment.totalValue;
    dto.ticket_url = makeFileURL(`/api/policy/${params.id}/pdf`, domain);
    dto.icon = makeFileURL(params.plan.product.icon, domain);

    return dto;
  }
}
