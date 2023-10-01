import { MigrationInterface, QueryRunner } from "typeorm";

export class Estado1696182552706 implements MigrationInterface {
    name = 'Estado1696182552706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estados" DROP CONSTRAINT "UQ_6ea889be05fb9e8b8792dc8b2d0"`);
        await queryRunner.query(`ALTER TABLE "estados" DROP COLUMN "teste"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estados" ADD "teste" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estados" ADD CONSTRAINT "UQ_6ea889be05fb9e8b8792dc8b2d0" UNIQUE ("teste")`);
    }

}
