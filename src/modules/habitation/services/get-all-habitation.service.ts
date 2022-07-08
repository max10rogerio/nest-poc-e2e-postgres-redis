import { Injectable } from '@nestjs/common';
import { GetAllHabitationRepository, GetAllHabitationRepositoryResponse } from '../repositories';

@Injectable()
export class GetAllHabitationService {
  constructor(private readonly getAllHabitationRepository: GetAllHabitationRepository) {}

  public async getAll(): Promise<GetAllHabitationRepositoryResponse> {
    return this.getAllHabitationRepository.getAllHabitations();
  }
}

export type GetAllHabitationServiceResponse = GetAllHabitationRepositoryResponse;
