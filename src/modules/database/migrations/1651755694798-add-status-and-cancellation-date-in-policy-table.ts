import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusAndCancellationDateInPolicyTable1651755694798 implements MigrationInterface {
  name = 'addStatusAndCancellationDateInPolicyTable1651755694798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."apolices_status_enum" AS ENUM('Emitido', 'Cancelado')`);
    await queryRunner.query(
      `ALTER TABLE "apolices" ADD "status" "public"."apolices_status_enum" NOT NULL DEFAULT 'Emitido'`,
    );
    await queryRunner.query(`ALTER TABLE "apolices" ADD "data_cancelamento" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "data_fim_cobertura" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "data_fim_cobertura"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "data_cancelamento"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."apolices_status_enum"`);
  }
}
