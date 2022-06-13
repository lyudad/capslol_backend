import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateJobEntity1655107617446 implements MigrationInterface {
    name = 'UpdateJobEntity1655107617446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`isArchived\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`isArchived\``);
    }

}
