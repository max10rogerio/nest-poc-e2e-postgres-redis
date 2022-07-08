import { Controller, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServerError } from 'src/errors';
import { CancelPolicyService } from '../services';
import { CancelPolicyRequestDTO, CancelPolicyResponseDTO } from './dto';

@Controller('policy')
@ApiTags('Policy')
@ApiBearerAuth()
export class CancelPolicyController {
  constructor(private readonly cancelPolicyService: CancelPolicyService) {}

  @ApiOkResponse({
    type: CancelPolicyResponseDTO,
  })
  @ApiBadRequestResponse({
    type: ServerError,
  })
  @ApiOperation({
    summary: 'Cancela a apólice',
  })
  @Post(':id/cancel')
  public async cancelPolicy(@Param() param: CancelPolicyRequestDTO): Promise<CancelPolicyResponseDTO> {
    return await this.cancelPolicyService.cancelPolicy(param.id);
  }
}
