import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeColumnOrderFromTablePlan1654019777503 implements MigrationInterface {
  name = 'removeColumnOrderFromTablePlan1654019777503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "ordem"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planos" ADD "ordem" integer NOT NULL DEFAULT '1'`);
  }
}
