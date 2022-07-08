import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeEnumTypes1656703686851 implements MigrationInterface {
  name = 'changeEnumTypes1656703686851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."status_enum" RENAME TO "status_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."exportacoes_status_enum" AS ENUM('Sucesso', 'Erro')`);
    await queryRunner.query(
      `ALTER TABLE "exportacoes" ALTER COLUMN "status" TYPE "public"."exportacoes_status_enum" USING "status"::"text"::"public"."exportacoes_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."status_enum_old"`);
    await queryRunner.query(`ALTER TYPE "public"."clientes_genero_enum" RENAME TO "clientes_genero_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."clientes_genero_enum" AS ENUM('M', 'F', 'N')`);
    await queryRunner.query(
      `ALTER TABLE "clientes" ALTER COLUMN "genero" TYPE "public"."clientes_genero_enum" USING "genero"::"text"::"public"."clientes_genero_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clientes_genero_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."clientes_estado_civil_enum" RENAME TO "clientes_estado_civil_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clientes_estado_civil_enum" AS ENUM('Solteiro', 'Casado', 'Separado', 'Divorciado', 'Viúvo', 'Relação_Estável')`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ALTER COLUMN "estado_civil" TYPE "public"."clientes_estado_civil_enum" USING "estado_civil"::"text"::"public"."clientes_estado_civil_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clientes_estado_civil_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."clientes_estado_civil_enum_old" AS ENUM('Solteiro', 'Casado', 'Separado', 'Divorciado', 'Viúvo')`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ALTER COLUMN "estado_civil" TYPE "public"."clientes_estado_civil_enum_old" USING "estado_civil"::"text"::"public"."clientes_estado_civil_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clientes_estado_civil_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."clientes_estado_civil_enum_old" RENAME TO "clientes_estado_civil_enum"`,
    );
    await queryRunner.query(`CREATE TYPE "public"."clientes_genero_enum_old" AS ENUM('M', 'F')`);
    await queryRunner.query(
      `ALTER TABLE "clientes" ALTER COLUMN "genero" TYPE "public"."clientes_genero_enum_old" USING "genero"::"text"::"public"."clientes_genero_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clientes_genero_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."clientes_genero_enum_old" RENAME TO "clientes_genero_enum"`);
    await queryRunner.query(`CREATE TYPE "public"."status_enum_old" AS ENUM('Sucesso', 'Erro')`);
    await queryRunner.query(
      `ALTER TABLE "exportacoes" ALTER COLUMN "status" TYPE "public"."status_enum_old" USING "status"::"text"::"public"."status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."exportacoes_status_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."status_enum_old" RENAME TO "status_enum"`);
  }
}
