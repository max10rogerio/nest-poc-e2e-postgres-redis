import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTypeColumnInLogPaymentTable1655295599377 implements MigrationInterface {
  name = 'addTypeColumnInLogPaymentTable1655295599377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."log_pagamentos_tipo_enum" AS ENUM('Pagamento', 'Estorno')`);
    await queryRunner.query(
      `ALTER TABLE "log_pagamentos" ADD "tipo" "public"."log_pagamentos_tipo_enum" NOT NULL DEFAULT 'Pagamento'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "log_pagamentos" DROP COLUMN "tipo"`);
    await queryRunner.query(`DROP TYPE "public"."log_pagamentos_tipo_enum"`);
  }
}
