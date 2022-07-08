import { MigrationInterface, QueryRunner } from 'typeorm';

export class allowNullComplementTableAddress1652818308986 implements MigrationInterface {
  name = 'allowNullComplementTableAddress1652818308986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enderecos" ALTER COLUMN "complemento" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enderecos" ALTER COLUMN "complemento" SET NOT NULL`);
  }
}
