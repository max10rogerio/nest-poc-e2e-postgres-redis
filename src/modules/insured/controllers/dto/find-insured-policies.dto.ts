import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';
import { makeFileURL } from 'src/config';
import { FindInsuredPoliciesServiceResponse } from '../../services';

export class FindInsuredPoliciesControllerParamsDTO {
  @Length(11, 11)
  @IsNumberString()
  @ApiProperty()
  cpf: string;
}

export class FindInsuredPoliciesControllerResponseDTO {
  @ApiProperty()
  policy_id: number;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ticket: string;

  toDTO(policies: FindInsuredPoliciesServiceResponse, domain: string): FindInsuredPoliciesControllerResponseDTO[] {
    return policies.map((policy) => {
      const dto = new FindInsuredPoliciesControllerResponseDTO();
      dto.icon = makeFileURL(policy.plan.product.icon, domain);
      dto.name = policy.plan.product.description;
      dto.policy_id = policy.id;
      dto.ticket = policy.ticket;

      return dto;
    });
  }
}
