import { ApiProperty } from '@nestjs/swagger';
import { GetAllHabitationServiceResponse } from '../../services/get-all-habitation.service';

export class HabitationValues {
  @ApiProperty({
    description: 'id',
  })
  id: number;

  @ApiProperty({
    description: 'Descrição',
  })
  description: string;

  @ApiProperty({
    description: 'Código',
  })
  code: string;
}

export class GetAllHabitationResponseDTO {
  @ApiProperty({
    description: 'Descrição',
  })
  description: string;

  @ApiProperty({
    description: 'Chave',
  })
  key: string;

  @ApiProperty({
    description: 'Habitacao',
  })
  values: HabitationValues[];

  toDTO(params: GetAllHabitationServiceResponse[number]): GetAllHabitationResponseDTO {
    const habitationDto = new GetAllHabitationResponseDTO();

    habitationDto.description = params.description;
    habitationDto.key = params.key;
    habitationDto.values = params.habitations.map((habitation) => {
      const hab = new HabitationValues();
      hab.id = habitation.id;
      hab.code = habitation.code;
      hab.description = habitation.description;
      return hab;
    });

    return habitationDto;
  }
}
