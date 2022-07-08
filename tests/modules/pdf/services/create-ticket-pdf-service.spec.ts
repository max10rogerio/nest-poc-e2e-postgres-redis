import { Test, TestingModule } from '@nestjs/testing';
import { PDFTemplates } from 'src/modules/pdf/constants';
import { PDFModule } from 'src/modules/pdf/pdf.module';
import { CreateTicketPDFService, HandlebarsService } from 'src/modules/pdf/services';
import { DIH_CONTEXT, RE_CONTEXT } from './__mocks__/create-ticket-pdf.mock';

describe('CreateTicketPDFService Unit', () => {
  let createTicketPDFService: CreateTicketPDFService;
  let handlebarsService: HandlebarsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PDFModule],
    }).compile();

    createTicketPDFService = app.get<CreateTicketPDFService>(CreateTicketPDFService);
    handlebarsService = app.get<HandlebarsService>(HandlebarsService);
  });

  it('should be call handlebarsService with correct params for residential policy', async () => {
    jest.spyOn(handlebarsService, 'compile');

    await createTicketPDFService.toPDF(RE_CONTEXT);

    expect(handlebarsService.compile).toHaveBeenCalledWith(PDFTemplates.TICKET, RE_CONTEXT);
  });

  it('should be call handlebarsService with correct params for common policy', async () => {
    jest.spyOn(handlebarsService, 'compile');

    await createTicketPDFService.toPDF(DIH_CONTEXT);

    expect(handlebarsService.compile).toHaveBeenCalledWith(PDFTemplates.TICKET, DIH_CONTEXT);
  });

  it('should be allow import ticket context', async () => {
    await expect(import('src/modules/pdf/contexts')).resolves.not.toBeUndefined();
  });
});
