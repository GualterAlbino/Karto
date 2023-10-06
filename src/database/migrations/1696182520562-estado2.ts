import { MigrationInterface, QueryRunner } from "typeorm";

export class Estado21696182520562 implements MigrationInterface {
    name = 'Estado21696182520562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estados" ADD "teste" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estados" ADD CONSTRAINT "UQ_6ea889be05fb9e8b8792dc8b2d0" UNIQUE ("teste")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estados" DROP CONSTRAINT "UQ_6ea889be05fb9e8b8792dc8b2d0"`);
        await queryRunner.query(`ALTER TABLE "estados" DROP COLUMN "teste"`);
    }

}
