import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { Env } from 'src/config';
import { PlanNotFound } from 'src/errors';
import { FindPlanDetailsByIdService } from '../services';
import { CoveragesDTO, FindPlanDetailsDTO } from './dtos';

class ParamsDTO {
  @ApiProperty({ description: 'Id do plano' })
  @IsNumberString()
  id: string;
}

@Controller('plans')
@ApiTags('Plans')
@ApiExtraModels(CoveragesDTO)
@ApiBearerAuth()
export class FindPlanDetailsByIdController {
  constructor(
    private readonly findPlanDetailsByIdService: FindPlanDetailsByIdService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @ApiOperation({
    summary: 'Lista os detalhes de um planos com suas coberturas',
  })
  @ApiOkResponse({
    type: FindPlanDetailsDTO,
  })
  @ApiNotFoundResponse({
    type: PlanNotFound,
    description: 'Retorna esse erro quando o plano não é encontrado',
  })
  @Get(':id')
  public async findById(@Param() params: ParamsDTO): Promise<FindPlanDetailsDTO> {
    const planDetails = await this.findPlanDetailsByIdService.findById(+params.id);

    const response = new FindPlanDetailsDTO().toDTO(planDetails, this.configService.get('domain'));

    return response;
  }
}
