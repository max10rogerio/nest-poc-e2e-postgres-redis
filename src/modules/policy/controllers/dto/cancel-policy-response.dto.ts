import { ApiProperty } from '@nestjs/swagger';
import { PolicyStatusEnum } from 'src/modules/database/constants';

export class CancelPolicyResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cancellationDate?: Date;

  @ApiProperty()
  coverageEndDate?: Date;

  @ApiProperty()
  status: PolicyStatusEnum;
}
