import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetUserInfoRepository } from './repositories';

@Module({
  imports: [HttpModule],
  providers: [GetUserInfoRepository],
  exports: [GetUserInfoRepository],
})
export class ApoloModule {}
