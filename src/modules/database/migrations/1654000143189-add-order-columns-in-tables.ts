import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOrderColumnsInTables1654000143189 implements MigrationInterface {
  name = 'addOrderColumnsInTables1654000143189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" ADD "ordem" integer NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "ordem" integer NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE "produtos" ADD "ordem" integer NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "ordem" integer NOT NULL DEFAULT '1'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "ordem"`);
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "ordem"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "ordem"`);
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" DROP COLUMN "ordem"`);
  }
}
