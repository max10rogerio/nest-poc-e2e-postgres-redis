import { plainToClass } from 'class-transformer';
import * as dayjs from 'dayjs';
import { CreatePolicyParamsDTO, CreatePolicyResponseDTO } from 'src/modules/policy/controllers/dto';
import { CreatePolicyDTOMock } from './__mocks__/create-policy.dto.mock';

describe('CreatePolicyDTO (Unit)', () => {
  describe('CreatePolicyParamsDTO', () => {
    it('should cast object to class dto', async () => {
      const mock = new CreatePolicyDTOMock().makeCompletePayload();

      const dto = plainToClass(CreatePolicyParamsDTO, mock);

      expect(dto).toBeInstanceOf(CreatePolicyParamsDTO);
    });

    it('should mount incomming values to complete object params', () => {
      const mock = new CreatePolicyDTOMock().makeCompletePayload();
      const expected = new CreatePolicyDTOMock().makeCompleteParams();

      const params = new CreatePolicyParamsDTO().toParams(mock);

      expect(params).toEqual(expected);
    });

    it('should mount incomming without residencial address to object params', () => {
      const mock = new CreatePolicyDTOMock().makeCompletePayload();

      const expected = new CreatePolicyDTOMock().makeCompleteParams();

      delete expected.residential.address;
      delete mock.residential.address;

      const params = new CreatePolicyParamsDTO().toParams(mock);

      expect(params).toEqual(expected);
    });

    it('should mount incomming without residencial to object params', () => {
      const mock = new CreatePolicyDTOMock().makeCompletePayload();

      const expected = new CreatePolicyDTOMock().makeCompleteParams();

      delete expected.residential;
      delete mock.residential;

      const params = new CreatePolicyParamsDTO().toParams(mock);

      expect(params).toEqual(expected);
    });
  });

  describe('CreatePolicyResponseDTO', () => {
    it('should format to object response', () => {
      const dateMock = new Date();

      const dto = new CreatePolicyResponseDTO().toDTO({
        policyId: 1,
        luckNumber: 1,
        ticket: '1',
        endDate: dateMock,
        startDate: dateMock,
        iofValue: 1,
        liquidValue: 10,
        totalValue: 11,
        planName: 'test',
      });

      expect(dto).toEqual({
        id: 1,
        luck_number: 1,
        ticket: '1',
        plan_name: 'test',
        end_date: dayjs(dateMock).format('YYYY-MM-DD HH:mm:ss'),
        start_date: dayjs(dateMock).format('YYYY-MM-DD HH:mm:ss'),
        iof_value: 1,
        liquid_value: 10,
        total_value: 11,
      });
    });
  });
});
