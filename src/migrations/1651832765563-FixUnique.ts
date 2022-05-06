import {MigrationInterface, QueryRunner} from "typeorm";

export class FixUnique1651832765563 implements MigrationInterface {
    name = 'FixUnique1651832765563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isGoogle\` tinyint NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastName\` \`lastName\` varchar(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastName\` \`lastName\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isGoogle\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` timestamp NOT NULL`);
    }

}
