import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LotteryConfigEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateLotteryLastNumberRepository {
  constructor(
    @InjectRepository(LotteryConfigEntity)
    private readonly lotteryRepository: Repository<LotteryConfigEntity>,
  ) {}

  public async update(newValue: number): Promise<void> {
    const config = await this.lotteryRepository.findOne();

    config.lastNumber = newValue;

    await config.save();
  }
}
