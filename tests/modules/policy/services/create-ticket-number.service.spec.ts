import { Test, TestingModule } from '@nestjs/testing';
import { CreateTicketNumberService } from 'src/modules/policy/services';

describe('CreateTicketNumberService (Unit)', () => {
  let createTicketNumberService: CreateTicketNumberService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CreateTicketNumberService],
    }).compile();

    createTicketNumberService = app.get<CreateTicketNumberService>(CreateTicketNumberService);
  });

  it('should be return a ticket number string', () => {
    const expected = '135000000000999';
    const ticket = createTicketNumberService.createTicketNumber(135, 999);

    expect(ticket).toEqual(expected);
  });
});
