import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteColumnContractNumberInAgent1653414554306 implements MigrationInterface {
  name = 'deleteColumnContractNumberInAgent1653414554306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" DROP COLUMN "numero_contrato"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" ADD "numero_contrato" integer`);
  }
}
