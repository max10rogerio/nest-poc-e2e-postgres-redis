import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CepNotFound } from 'src/errors';
import { CepModule } from 'src/modules/cep/cep.module';
import { FindCepResponseDTO } from 'src/modules/cep/controller/dtos';
import { FindCepRepository } from 'src/modules/cep/repository';
import * as request from 'supertest';

describe('Cep (E2E)', () => {
  let app: INestApplication;
  let findCepRepository: FindCepRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CepModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    findCepRepository = app.get<FindCepRepository>(FindCepRepository);

    await app.init();
  });

  it('[SUCCESS] [200] /cep/:cep - should be return cep info', async () => {
    const mock = {
      cep: '87060420',
      city: 'Maringá',
      neighborhood: 'Jardim Universo',
      state: 'PR',
      street: 'Rua Universo',
      service: 'correios',
    };

    jest.spyOn(findCepRepository, 'find').mockImplementation(() => Promise.resolve(mock));

    const { status, body } = await request(app.getHttpServer()).get(`/cep/${mock.cep}`);

    expect(body).toEqual(new FindCepResponseDTO().toDTO(mock));
    expect(status).toEqual(HttpStatus.OK);
  });

  it('[FAILURE] [400] /cep/:cep - should be an error when CEP format is invalid', async () => {
    const { status } = await request(app.getHttpServer()).get(`/cep/fake-123`);

    expect(status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('[FAILURE] [400] /cep/:cep - should be an error when not found cep', async () => {
    jest.spyOn(findCepRepository, 'find').mockImplementation(() => Promise.reject('error'));

    const { status, body } = await request(app.getHttpServer()).get(`/cep/87060420`);

    expect(status).toEqual(HttpStatus.NOT_FOUND);
    expect(body).toEqual(new CepNotFound('error').toJSON());
  });
});
