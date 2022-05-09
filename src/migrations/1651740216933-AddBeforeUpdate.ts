import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBeforeUpdate1651740216933 implements MigrationInterface {
    name = 'AddBeforeUpdate1651740216933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` int NULL`);
    }

}
