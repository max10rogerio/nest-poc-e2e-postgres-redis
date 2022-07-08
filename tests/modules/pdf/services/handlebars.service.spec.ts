import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs/promises';
import { PDFTemplates } from 'src/modules/pdf/constants';
import { PDFModule } from 'src/modules/pdf/pdf.module';
import { HandlebarsService } from 'src/modules/pdf/services';

describe('HandlebarsService Unit', () => {
  let handlebarsService: HandlebarsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PDFModule],
    }).compile();

    handlebarsService = app.get<HandlebarsService>(HandlebarsService);
  });

  it('should be read a template HBS and convert to HTML string', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue('<h1>{{name}}</h1>');

    const html = await handlebarsService.compile(PDFTemplates.TICKET, { name: 'test' });

    expect(html).toEqual('<h1>test</h1>');
  });
});
