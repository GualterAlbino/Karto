import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaUsuarioEntity1695161020214 implements MigrationInterface {
    name = 'CriaUsuarioEntity1695161020214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "senha" character varying(10) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "deletado_em" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
