import { Injectable } from '@nestjs/common';
import { GetLotteryConfigsRepository, UpdateLotteryLastNumberRepository } from '../repositories';

@Injectable()
export class CreateLuckyNumberService {
  constructor(
    private readonly getLotteryConfigsRepository: GetLotteryConfigsRepository,
    private readonly updateLotteryLastNumberRepository: UpdateLotteryLastNumberRepository,
  ) {}

  public async createLuckyNumber(): Promise<number> {
    const FIRST_NUMBER = 0;
    const configs = await this.getLotteryConfigsRepository.getConfigs();

    const newNumber = configs.lastNumber === FIRST_NUMBER ? configs.initialRange : configs.lastNumber + 1;

    await this.updateLotteryLastNumberRepository.update(newNumber);

    return newNumber;
  }
}
