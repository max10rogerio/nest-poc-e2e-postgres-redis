import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixPropertyHabitationRelations1652895266330 implements MigrationInterface {
  name = 'fixPropertyHabitationRelations1652895266330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT IF EXISTS "FK_64a8e5310668b56c3714a037992"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT IF EXISTS "FK_e0eb41ff001d8fb48ea468bcc94"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT IF EXISTS "FK_bdadc03219a099180824c4cfd2d"`);
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_bdadc03219a099180824c4cfd2d" FOREIGN KEY ("tipo_moradia_id") REFERENCES "habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_e0eb41ff001d8fb48ea468bcc94" FOREIGN KEY ("tipo_construcao_id") REFERENCES "habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_64a8e5310668b56c3714a037992" FOREIGN KEY ("tipo_imovel_id") REFERENCES "habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT "FK_64a8e5310668b56c3714a037992"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT "FK_e0eb41ff001d8fb48ea468bcc94"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT "FK_bdadc03219a099180824c4cfd2d"`);
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_bdadc03219a099180824c4cfd2d" FOREIGN KEY ("tipo_moradia_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_e0eb41ff001d8fb48ea468bcc94" FOREIGN KEY ("tipo_construcao_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_64a8e5310668b56c3714a037992" FOREIGN KEY ("tipo_imovel_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
