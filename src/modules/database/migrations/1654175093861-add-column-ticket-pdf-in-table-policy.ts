import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnTicketPdfInTablePolicy1654175093861 implements MigrationInterface {
  name = 'addColumnTicketPdfInTablePolicy1654175093861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" ADD "bilhete_pdf" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "bilhete_pdf"`);
  }
}
