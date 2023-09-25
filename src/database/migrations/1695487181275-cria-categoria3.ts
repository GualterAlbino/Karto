import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaCategoria31695487181275 implements MigrationInterface {
    name = 'CriaCategoria31695487181275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "deletado_em"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" ADD "deletado_em" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "senha" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "email" character varying(255) NOT NULL`);
    }

}
