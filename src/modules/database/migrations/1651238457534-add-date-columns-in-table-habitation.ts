import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDateColumnsInTableHabitation1651238457534 implements MigrationInterface {
  name = 'addDateColumnsInTableHabitation1651238457534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "habitacao" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "habitacao" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "habitacao" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "habitacao" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "habitacao" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "habitacao" DROP COLUMN "created_at"`);
  }
}
