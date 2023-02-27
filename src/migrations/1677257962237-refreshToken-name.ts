import { MigrationInterface, QueryRunner } from "typeorm";

export class refreshTokenName1677257962237 implements MigrationInterface {
    name = 'refreshTokenName1677257962237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "resfresh_token" TO "refresh_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "refresh_token" TO "resfresh_token"`);
    }

}
