import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ProductsModule } from 'src/modules/products/products.module';
import * as request from 'supertest';
import { FindAllProductsControllerSeeder } from './__mocks__/find-all-products-controller.mock';

describe('FindAllProductsController (e2e)', () => {
  let app: INestApplication;
  let seeder: FindAllProductsControllerSeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new FindAllProductsControllerSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('[SUCCESS] [200] /api/products  - should return an empty array', async () => {
    return request(app.getHttpServer()).get('/products').expect(HttpStatus.OK).expect([]);
  });

  it('[SUCCESS] [200] /api/products  - should return a formated response', async () => {
    await seeder.seed();

    const seedMock = seeder.getMock();
    const expected = {
      id: 1,
      icon: null,
      terms_pdf: null,
      description: seedMock.description,
      inicial_price: seedMock.plans[0].prizeValue,
      has_multiple_plans: true,
    };

    return request(app.getHttpServer()).get('/products').expect(HttpStatus.OK).expect([expected]);
  });
});
