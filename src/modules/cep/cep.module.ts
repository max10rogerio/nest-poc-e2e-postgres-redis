import { Module } from '@nestjs/common';
import { FindCepController } from './controller';
import { FindCepRepository } from './repository';
import { FindCepService } from './services';

@Module({
  providers: [FindCepService, FindCepRepository],
  controllers: [FindCepController],
  exports: [FindCepService],
})
export class CepModule {}
