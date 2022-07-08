import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Env } from 'src/config';
import { FindPolicyByIdService } from '../services';
import { FindPolicyByIdParamsDTO, FindPolicyByIdResponseDTO } from './dto';

@Controller('policy')
@ApiBearerAuth()
@ApiTags('Policy')
export class FindPolicyByIdController {
  constructor(
    private readonly findPolicyByIdService: FindPolicyByIdService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @ApiOperation({ summary: 'Retorna informações da apólice pelo id' })
  @Get(':id')
  public async findById(@Param() params: FindPolicyByIdParamsDTO): Promise<FindPolicyByIdResponseDTO> {
    const policy = await this.findPolicyByIdService.findById(params.id);

    return new FindPolicyByIdResponseDTO().toDTO(policy, this.configService.get('domain'));
  }
}
