import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnExpirationDateInTableInstallment1651577316577 implements MigrationInterface {
  name = 'addColumnExpirationDateInTableInstallment1651577316577';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcelas" ADD "data_vencimento" date NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcelas" DROP COLUMN "data_vencimento"`);
  }
}
