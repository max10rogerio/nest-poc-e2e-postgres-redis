import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllHabitationService } from '../services';
import { GetAllHabitationResponseDTO } from './dto/get-all-habitation.dto';

@ApiTags('Habitation')
@Controller('habitation')
export class GetAllHabitationController {
  constructor(private readonly getAllHabitationService: GetAllHabitationService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todas as opções de parametrização para moradia',
  })
  @ApiOkResponse({
    type: GetAllHabitationResponseDTO,
    isArray: true,
  })
  public async getAllHabitation(): Promise<GetAllHabitationResponseDTO[]> {
    const habitation = await this.getAllHabitationService.getAll();

    return habitation.map((h) => new GetAllHabitationResponseDTO().toDTO(h));
  }
}
