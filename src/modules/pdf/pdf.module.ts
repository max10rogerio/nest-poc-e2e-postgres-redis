import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CreateTicketPDFService, HandlebarsService, PuppeteerService } from './services';

@Module({
  imports: [ConfigModule],
  providers: [HandlebarsService, PuppeteerService, CreateTicketPDFService],
  exports: [CreateTicketPDFService],
})
export class PDFModule {}
