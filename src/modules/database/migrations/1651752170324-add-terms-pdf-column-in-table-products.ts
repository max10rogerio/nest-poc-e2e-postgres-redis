import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTermsPdfColumnInTableProducts1651752170324 implements MigrationInterface {
  name = 'addTermsPdfColumnInTableProducts1651752170324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" ADD "termo_pdf" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "termo_pdf"`);
  }
}
