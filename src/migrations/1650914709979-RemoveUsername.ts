import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUsername1650914709979 implements MigrationInterface {
    name = 'RemoveUsername1650914709979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NOT NULL`);
    }

}
