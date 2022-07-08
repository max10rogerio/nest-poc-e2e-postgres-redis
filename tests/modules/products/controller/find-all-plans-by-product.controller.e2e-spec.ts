import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ProductsModule } from 'src/modules/products/products.module';
import * as request from 'supertest';
import { FindAllPlansByProductControllerSeeder } from './__mocks__/find-all-plans-by-product.controller.mock';

describe('FindAllPlansByProductController (e2e)', () => {
  let app: INestApplication;
  let seeder: FindAllPlansByProductControllerSeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new FindAllPlansByProductControllerSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('[SUCCESS] [200] /api/products/{id}/plans  - should return a formated response', async () => {
    await seeder.seed();

    const seedMock = seeder.getPlan();
    const expected = {
      id: 1,
      product_id: 1,
      description: seedMock.description,
      summary: seedMock.summary,
      plan_price: 9.9,
    };

    return request(app.getHttpServer()).get('/products/1/plans').expect(HttpStatus.OK).expect([expected]);
  });
});
