import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindCepService } from '../services';
import { FindCepParamsDTO, FindCepResponseDTO } from './dtos';

@Controller('cep')
@ApiTags('Cep')
@ApiBearerAuth()
export class FindCepController {
  constructor(private readonly findCepService: FindCepService) {}

  @ApiOperation({
    summary: 'Busca informações de um cep',
  })
  @Get(':cep')
  public async findCep(@Param() params: FindCepParamsDTO): Promise<FindCepResponseDTO> {
    const result = await this.findCepService.find(params.cep);

    return new FindCepResponseDTO().toDTO(result);
  }
}
