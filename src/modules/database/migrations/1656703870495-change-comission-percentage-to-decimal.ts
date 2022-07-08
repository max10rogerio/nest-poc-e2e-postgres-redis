import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeComissionPercentageToDecimal1656703870495 implements MigrationInterface {
  name = 'changeComissionPercentageToDecimal1656703870495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produto_representante" DROP COLUMN "percentual_comissao"`);
    await queryRunner.query(
      `ALTER TABLE "produto_representante" ADD "percentual_comissao" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produto_representante" DROP COLUMN "percentual_comissao"`);
    await queryRunner.query(
      `ALTER TABLE "produto_representante" ADD "percentual_comissao" integer NOT NULL DEFAULT '0'`,
    );
  }
}
