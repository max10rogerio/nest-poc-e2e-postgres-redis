import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../database/models';
import { CreateAddressRepository } from './repositories';
import { CreateAddressService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [CreateAddressService, CreateAddressRepository],
  exports: [CreateAddressService],
})
export class AddressModule {}
