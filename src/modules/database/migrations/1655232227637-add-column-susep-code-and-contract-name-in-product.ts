import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnSusepCodeAndContractNameInProduct1655232227637 implements MigrationInterface {
  name = 'addColumnSusepCodeAndContractNameInProduct1655232227637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" ADD "codigo_susep" integer`);
    await queryRunner.query(`ALTER TABLE "produtos" ADD "nome_contrato" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "nome_contrato"`);
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "codigo_susep"`);
  }
}
