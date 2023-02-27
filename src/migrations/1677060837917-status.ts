import { MigrationInterface, QueryRunner } from "typeorm";

export class status1677060837917 implements MigrationInterface {
    name = 'status1677060837917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('Active', 'Inactive')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'Inactive'`);
        await queryRunner.query(`CREATE TYPE "public"."project_active_enum" AS ENUM('Active', 'Inactive')`);
        await queryRunner.query(`ALTER TABLE "project" ADD "active" "public"."project_active_enum" NOT NULL DEFAULT 'Inactive'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "active"`);
        await queryRunner.query(`DROP TYPE "public"."project_active_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
