import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableInstallmentsSetNullTransactionCode1652808407968 implements MigrationInterface {
  name = 'alterTableInstallmentsSetNullTransactionCode1652808407968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcelas" ALTER COLUMN "codigo_transacao" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcelas" ALTER COLUMN "codigo_transacao" SET NOT NULL`);
  }
}
