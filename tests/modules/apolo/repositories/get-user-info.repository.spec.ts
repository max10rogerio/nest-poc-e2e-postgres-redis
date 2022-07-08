import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ApoloModule } from 'src/modules/apolo/apolo.module';
import { GetUserInfoRepository } from 'src/modules/apolo/repositories';
import { ConfigModule } from 'src/modules/config/config.module';
import { data } from './__mocks__/get-user-info.repository.mock';

describe('GetUserInfoRepository (Unit)', () => {
  let app: INestApplication;
  let http: HttpService;
  let getUserInfoRepository: GetUserInfoRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, ApoloModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    http = app.get<HttpService>(HttpService);
    getUserInfoRepository = app.get<GetUserInfoRepository>(GetUserInfoRepository);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return null', async () => {
    const cpf = '123456';
    jest.spyOn(http, 'get').mockImplementation(() => of('') as never);

    const result = await getUserInfoRepository.getUserInfo(cpf);
    expect(result).toBeNull();
  });

  it('should get user info', async () => {
    const cpf = '123456';
    jest.spyOn(http, 'get').mockImplementation(() => of({ data }) as never);

    const result = await getUserInfoRepository.getUserInfo(cpf);
    expect(result).toEqual(data);
  });
});
