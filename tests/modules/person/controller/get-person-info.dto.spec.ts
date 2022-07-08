import { GetPersonInfoResponseDTO } from 'src/modules/person/controllers/dto';
import {
  personComplete,
  personNoAddress,
  personNoContact,
  personResponseComplete,
  personResponseNoAddress,
  personResponseNoContact,
} from './__mocks__/get-person-info-response.dto.mock';

describe('GetPersonInfoResponseDTO (Unit)', () => {
  it('should return address complete', async () => {
    expect(new GetPersonInfoResponseDTO().toDTO(personComplete)).toEqual(personResponseComplete);
  });

  it('should return no address', async () => {
    expect(new GetPersonInfoResponseDTO().toDTO(personNoAddress)).toEqual(personResponseNoAddress);
  });

  it('should return no contact', async () => {
    expect(new GetPersonInfoResponseDTO().toDTO(personNoContact)).toEqual(personResponseNoContact);
  });
});
