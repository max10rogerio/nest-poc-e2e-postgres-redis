import { PlanEntity, ProductEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { DeepPartial, Repository } from 'typeorm';

export class FindAllProductsControllerSeeder extends SeederAbstract {
  product: Repository<ProductEntity>;
  plans: Repository<PlanEntity>;

  constructor() {
    super();

    this.product = this.connection.getRepository(ProductEntity);
    this.plans = this.connection.getRepository(PlanEntity);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.product.metadata.tableName);
    await this.truncateTable(this.plans.metadata.tableName);
  }

  public async seed() {
    const { plans, ...productMock } = this.getMock();

    const product = await this.product.save(productMock);

    await this.plans.save(plans.map((p) => ({ ...p, productId: product.id })));
  }

  public getMock(): DeepPartial<ProductEntity> {
    return {
      branchGroupNumber: 1,
      branchNumber: 1,
      description: 'product test',
      plans: [
        {
          description: 'min price plan',
          prizeValue: 10,
          code: 1,
          numberInstallments: 12,
          iofValue: 1.24,
        },
        {
          description: 'max price plan',
          prizeValue: 500,
          code: 1,
          numberInstallments: 12,
          iofValue: 1.24,
        },
      ],
    };
  }
}
