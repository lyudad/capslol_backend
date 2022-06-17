import {MigrationInterface, QueryRunner} from "typeorm";

export class NewMigration1655373744834 implements MigrationInterface {
    name = 'NewMigration1655373744834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat-contacts\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`content\` varchar(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat-contacts\` DROP COLUMN \`createdAt\``);
    }

}
