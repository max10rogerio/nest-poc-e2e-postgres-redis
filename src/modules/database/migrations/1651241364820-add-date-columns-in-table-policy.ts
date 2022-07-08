import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDateColumnsInTablePolicy1651241364820 implements MigrationInterface {
  name = 'addDateColumnsInTablePolicy1651241364820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "created_at"`);
  }
}
