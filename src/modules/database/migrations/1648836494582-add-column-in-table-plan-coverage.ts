import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnInTablePlanCoverage1648836494582 implements MigrationInterface {
  name = 'addColumnInTablePlanCoverage1648836494582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plano_coberturas" ADD "texto_general" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP COLUMN "texto_general"`);
  }
}
