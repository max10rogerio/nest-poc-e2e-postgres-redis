import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotteryConfigEntity } from '../database/models';
import { GetLotteryConfigsRepository, UpdateLotteryLastNumberRepository } from './repositories';
import { CreateLuckyNumberService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([LotteryConfigEntity])],
  providers: [CreateLuckyNumberService, GetLotteryConfigsRepository, UpdateLotteryLastNumberRepository],
  exports: [CreateLuckyNumberService],
})
export class LotteryModule {}
