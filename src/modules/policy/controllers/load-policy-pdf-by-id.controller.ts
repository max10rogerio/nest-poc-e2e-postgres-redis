import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiBearerAuth, ApiProduces, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/modules/common/decorators/public.decorator';
import { LoadStreamTicketPolicyService } from '../services/load-stream-ticket-policy.service';
import { LoadPolicyPdfByIdParams } from './dto';

@Controller('policy')
@ApiTags('Policy')
@ApiBearerAuth()
export class LoadPolicyPdfByIdController {
  constructor(private readonly loadStreamTicketPolicyService: LoadStreamTicketPolicyService) {}

  @Get(':id/pdf')
  @ApiProduces('application/pdf')
  @Public()
  async load(@Param() params: LoadPolicyPdfByIdParams, @Res({ passthrough: true }) response: Response) {
    try {
      const ticketStream = await this.loadStreamTicketPolicyService.loadStream(+params.id);

      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="bilhete.pdf"',
      });

      return new StreamableFile(ticketStream);
    } catch (error) {
      throw error;
    }
  }
}
