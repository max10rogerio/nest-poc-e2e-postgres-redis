import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnIconInTableProducts1650369014387 implements MigrationInterface {
  name = 'addColumnIconInTableProducts1650369014387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" ADD "icone" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "icone"`);
  }
}
