import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnLuckNumberInPolicy1649677845066 implements MigrationInterface {
  name = 'addColumnLuckNumberInPolicy1649677845066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" ADD "numero_sorte" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "numero_sorte"`);
  }
}
