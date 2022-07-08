import { Module } from '@nestjs/common';
import { ApoloModule } from '../apolo/apolo.module';
import { GetPersonInfoController } from './controllers';
import { GetPersonInfoService } from './services';

@Module({
  imports: [ApoloModule],
  providers: [GetPersonInfoService],
  controllers: [GetPersonInfoController],
})
export class PersonModule {}
