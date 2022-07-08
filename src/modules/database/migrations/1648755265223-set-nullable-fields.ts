import { MigrationInterface, QueryRunner } from 'typeorm';

export class setNullableFields1648755265223 implements MigrationInterface {
  name = 'setNullableFields1648755265223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planos" ALTER COLUMN "descricao" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "planos" ALTER COLUMN "resumo" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "icone" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "descricao" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "observacao" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "detalhes" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "texto_carencia" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "texto_franquia" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "texto_franquia" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "texto_carencia" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "detalhes" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "observacao" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "descricao" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "icone" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "planos" ALTER COLUMN "resumo" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "planos" ALTER COLUMN "descricao" SET NOT NULL`);
  }
}
