import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnsInTableInstallment1652811753269 implements MigrationInterface {
  name = 'addColumnsInTableInstallment1652811753269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcelas" ADD "pagamento_id" integer`);
    await queryRunner.query(`ALTER TABLE "parcelas" ADD "request_id" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcelas" DROP COLUMN "request_id"`);
    await queryRunner.query(`ALTER TABLE "parcelas" DROP COLUMN "pagamento_id"`);
  }
}
