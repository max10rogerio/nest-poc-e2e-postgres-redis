import { HttpService } from '@nestjs/axios';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { InvalidToken } from 'src/errors';
import { AppModule } from 'src/modules/app/app.module';
import * as request from 'supertest';

describe('AuthGuard (e2e)', () => {
  let app: INestApplication;
  let http: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    http = app.get<HttpService>(HttpService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('[FAILURE] [401] /products - should return error when invalid token', async () => {
    const { body, status } = await request(app.getHttpServer()).get(`/products`);

    expect(status).toEqual(HttpStatus.UNAUTHORIZED);
    expect(body).toEqual(new InvalidToken().toJSON());
  });

  it('[SUCCESS] [200] /products - should return a valid response', async () => {
    jest.spyOn(http, 'get').mockImplementation(() => of('dsa') as never);

    const { body, status } = await request(app.getHttpServer())
      .get(`/products`)
      .set('Authorization', 'Bearer faketoken');

    expect(body).toEqual([]);
    expect(status).toEqual(HttpStatus.OK);
  });
});
