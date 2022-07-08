import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDateColumnsInTableHabitationType1651239321343 implements MigrationInterface {
  name = 'addDateColumnsInTableHabitationType1651239321343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_habitacao" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tipos_habitacao" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tipos_habitacao" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_habitacao" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_habitacao" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_habitacao" DROP COLUMN "created_at"`);
  }
}
