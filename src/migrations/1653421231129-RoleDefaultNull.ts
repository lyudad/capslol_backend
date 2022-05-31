import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleDefaultNull1653421231129 implements MigrationInterface {
    name = 'RoleDefaultNull1653421231129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('Freelancer', 'Job Owner', 'No set') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('Freelancer', 'Job Owner', 'No set') NOT NULL`);
    }

}
