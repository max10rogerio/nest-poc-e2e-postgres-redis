import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PersonNotFound } from 'src/errors';
import { GetPersonInfoService } from '../services';
import { GetPersonInfoParamsDTO, GetPersonInfoResponseDTO } from './dto';

@ApiTags('Person')
@ApiBearerAuth()
@Controller('person')
@ApiBearerAuth()
export class GetPersonInfoController {
  constructor(private readonly getPersonInfoService: GetPersonInfoService) {}

  @Get(':cpf')
  @ApiOperation({ summary: 'Retorna as informações do usuário do sistema Apolo' })
  @ApiOkResponse({
    type: GetPersonInfoResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Retorna esse erro quando não encotra a pessoa pelo CPF',
    type: PersonNotFound,
  })
  public async getPersonByCPF(@Param() params: GetPersonInfoParamsDTO): Promise<GetPersonInfoResponseDTO> {
    const person = await this.getPersonInfoService.getPersonByCPF(params.cpf);

    return new GetPersonInfoResponseDTO().toDTO(person);
  }
}
