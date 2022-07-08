import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitationTypeEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllHabitationRepository {
  constructor(
    @InjectRepository(HabitationTypeEntity)
    private readonly habitationTypeRepository: Repository<HabitationTypeEntity>,
  ) {}

  public async getAllHabitations(): Promise<GetAllHabitationRepositoryResponse> {
    const builder = this.habitationTypeRepository
      .createQueryBuilder('habitationType')
      .innerJoinAndSelect('habitationType.habitations', 'habitations')
      .select();

    return await builder.getMany();
  }
}

export type GetAllHabitationRepositoryResponse = HabitationTypeEntity[];
