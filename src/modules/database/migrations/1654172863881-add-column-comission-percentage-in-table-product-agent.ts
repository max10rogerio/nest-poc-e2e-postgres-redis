import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnComissionPercentageInTableProductAgent1654172863881 implements MigrationInterface {
  name = 'addColumnComissionPercentageInTableProductAgent1654172863881';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produto_representante" ADD "percentual_comissao" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produto_representante" DROP COLUMN "percentual_comissao"`);
  }
}
