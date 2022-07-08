import { Module } from '@nestjs/common';
import { CreateTextDIHService } from './services';
import { CreateTextREService } from './services/create-text-re.service';

@Module({
  providers: [CreateTextDIHService, CreateTextREService],
  exports: [CreateTextDIHService, CreateTextREService],
})
export class I4proModule {}
