import { FindPlanDetailsDTO } from 'src/modules/plans/controllers/dtos';
import { domain, expected, payload } from './__mocks__/find-plan-details-response.mock';

describe('FindPlanDetailsDTO (DTO)', () => {
  it('should be format object', () => {
    const findSpy = jest.spyOn(Array.prototype, 'find' as any);

    const dto = new FindPlanDetailsDTO().toDTO(payload as any, domain);

    expect(findSpy).toHaveBeenCalled();

    expect(dto).toEqual(expected);
  });
});
