import { makeFileURL } from 'src/config';
import { CoverageEntity, CoverageTypeEntity, PlanEntity, ProductEntity } from 'src/modules/database/models';
import { PlanCoverageEntity } from 'src/modules/database/models/plan-coverage.entity';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindPlanDetailsByIdSeeder extends SeederAbstract {
  coverageTypes: Repository<CoverageTypeEntity>;
  coverage: Repository<CoverageEntity>;
  planCoverage: Repository<PlanCoverageEntity>;
  plans: Repository<PlanEntity>;
  product: Repository<ProductEntity>;

  constructor() {
    super();

    this.coverageTypes = this.connection.getRepository(CoverageTypeEntity);
    this.coverage = this.connection.getRepository(CoverageEntity);
    this.planCoverage = this.connection.getRepository(PlanCoverageEntity);
    this.plans = this.connection.getRepository(PlanEntity);
    this.product = this.connection.getRepository(ProductEntity);
  }

  public async seed(): Promise<void> {
    const type = await this.coverageTypes.save({
      key: 'test',
      description: 'test type',
    });

    const coverage = await this.coverage.save({
      title: 'test coverage',
      description: 'test coverage description',
      coverageTypeId: type.id,
    });

    const product = await this.product.save({
      branchGroupNumber: 1,
      branchNumber: 1,
      description: 'test product',
      termsPDF: 'test.pdf',
    });

    const plan = await this.plans.save({
      description: 'test plan',
      prizeValue: 50,
      productId: product.id,
      code: 1,
      numberInstallments: 12,
      iofValue: 1.24,
    });

    await this.planCoverage.save({
      capitalValue: 50,
      prizeValue: 50,
      coverageId: coverage.id,
      planId: plan.id,
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.product.metadata.tableName);
    await this.truncateTable(this.plans.metadata.tableName);
    await this.truncateTable(this.planCoverage.metadata.tableName);
    await this.truncateTable(this.coverage.metadata.tableName);
    await this.truncateTable(this.coverageTypes.metadata.tableName);
  }
}

export const expected = (domain: string) => ({
  id: 1,
  prize_value: 50,
  description: 'test plan',
  summary: null,
  product: {
    id: 1,
    description: 'test product',
    terms_pdf: makeFileURL('test.pdf', domain),
    type: ProductTypeEnum.DEFAULT,
  },
  coverages: [
    {
      description: 'test type',
      key: 'test',
      values: [
        {
          icon: null,
          title: 'test coverage',
          capital_value: 50,
          capital_text: null,
          general_text: null,
          summary_text: null,
          shortage_text: null,
          franchise_text: null,
        },
      ],
    },
  ],
});
