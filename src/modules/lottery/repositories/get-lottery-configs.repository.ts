import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LotteryConfigEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class GetLotteryConfigsRepository {
  constructor(
    @InjectRepository(LotteryConfigEntity)
    private readonly lotteryRepository: Repository<LotteryConfigEntity>,
  ) {}

  getConfigs(): Promise<GetLotteryConfigsRepositoryResponse> {
    return this.lotteryRepository.findOne();
  }
}

export type GetLotteryConfigsRepositoryResponse = LotteryConfigEntity;
