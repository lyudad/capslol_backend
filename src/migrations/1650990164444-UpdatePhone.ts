import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePhone1650990164444 implements MigrationInterface {
    name = 'UpdatePhone1650990164444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int NULL`);
    }

}
