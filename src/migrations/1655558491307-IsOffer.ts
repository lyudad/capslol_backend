import {MigrationInterface, QueryRunner} from "typeorm";

export class IsOffer1655558491307 implements MigrationInterface {
    name = 'IsOffer1655558491307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`isOffer\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`isOffer\``);
    }

}
