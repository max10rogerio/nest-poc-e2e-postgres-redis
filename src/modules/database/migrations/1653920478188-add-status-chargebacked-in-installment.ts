import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusChargebackedInInstallment1653920478188 implements MigrationInterface {
  name = 'addStatusChargebackedInInstallment1653920478188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."parcelas_status_enum" RENAME TO "parcelas_status_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "public"."parcelas_status_enum" AS ENUM('Aberta', 'Cancelada', 'Quitada', 'Estornada')`,
    );
    await queryRunner.query(
      `ALTER TABLE "parcelas" ALTER COLUMN "status" TYPE "public"."parcelas_status_enum" USING "status"::"text"::"public"."parcelas_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."parcelas_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."parcelas_status_enum_old" AS ENUM('Aberta', 'Cancelada', 'Quitada')`,
    );
    await queryRunner.query(
      `ALTER TABLE "parcelas" ALTER COLUMN "status" TYPE "public"."parcelas_status_enum_old" USING "status"::"text"::"public"."parcelas_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."parcelas_status_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."parcelas_status_enum_old" RENAME TO "parcelas_status_enum"`);
  }
}
