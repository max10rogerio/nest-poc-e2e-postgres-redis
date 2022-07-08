import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTicketNumberService {
  private readonly MAX_TICKET_LENGTH = 15;

  public createTicketNumber(contractNumber: number, sequentialNumber: number): string {
    const zerosAmount = this.MAX_TICKET_LENGTH - String(sequentialNumber).length;

    const ticket = String(contractNumber).padEnd(zerosAmount, '0').concat(String(sequentialNumber));

    return ticket;
  }
}
