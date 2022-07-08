import { Injectable } from '@nestjs/common';
import { PDFTemplates } from '../constants';
import { TicketContext } from '../contexts';
import { HandlebarsService } from './handlebars.service';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class CreateTicketPDFService {
  constructor(
    private readonly handlebarsService: HandlebarsService,
    private readonly puppeteerService: PuppeteerService,
  ) {}

  async toPDF(params: CreateTicketPDFServiceParams): Promise<Buffer> {
    const html = await this.handlebarsService.compile(PDFTemplates.TICKET, params);

    return this.puppeteerService.createPDF(html);
  }
}

export type CreateTicketPDFServiceParams = TicketContext;
