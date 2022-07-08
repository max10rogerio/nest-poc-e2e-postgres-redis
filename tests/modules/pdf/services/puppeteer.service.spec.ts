import { Test, TestingModule } from '@nestjs/testing';
import { PDFModule } from 'src/modules/pdf/pdf.module';
import { PuppeteerService } from 'src/modules/pdf/services';

describe('PuppeteerService Unit', () => {
  let puppeteerService: PuppeteerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PDFModule],
    }).compile();

    puppeteerService = app.get<PuppeteerService>(PuppeteerService);
  });

  it('should be read a template HBS and convert to HTML string', async () => {
    const params = '<h1>test</h1>';
    const bufferPDF = await puppeteerService.createPDF(params);

    expect(bufferPDF).toBeInstanceOf(Buffer);
  });
});
