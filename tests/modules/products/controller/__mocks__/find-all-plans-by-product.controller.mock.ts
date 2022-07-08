import { PlanEntity, ProductEntity } from 'src/modules/database/models';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { DeepPartial, Repository } from 'typeorm';

export class FindAllPlansByProductControllerSeeder extends SeederAbstract {
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
    await this.product.save(this.getProduct());
    await this.plans.save(this.getPlan());
  }

  public getPlan(): DeepPartial<PlanEntity> {
    return {
      id: 1,
      productId: 1,
      description: 'Plan A',
      summary: 'This is the best Plan',
      prizeValue: 9.9,
      code: 1,
      iofValue: 1.24,
      numberInstallments: 12,
    };
  }

  private getProduct(): DeepPartial<ProductEntity> {
    return {
      id: 1,
      branchGroupNumber: 1,
      branchNumber: 95,
      description: 'Product One',
      type: ProductTypeEnum.DEFAULT,
    };
  }
}
