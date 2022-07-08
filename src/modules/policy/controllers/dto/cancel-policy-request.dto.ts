import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CancelPolicyRequestDTO {
  @ApiProperty()
  @IsNumberString()
  id: number;
}
