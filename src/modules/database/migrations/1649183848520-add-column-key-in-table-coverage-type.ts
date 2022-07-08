import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnKeyInTableCoverageType1649183848520 implements MigrationInterface {
  name = 'addColumnKeyInTableCoverageType1649183848520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" ADD "key" character varying NOT NULL DEFAULT 'coverages'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" DROP COLUMN "key"`);
  }
}
