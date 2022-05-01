import {MigrationInterface, QueryRunner} from "typeorm";

export class profile1651427155241 implements MigrationInterface {
    name = 'profile1651427155241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`profile_image\` varchar(255) NOT NULL, \`hour_rate\` int NOT NULL, \`available_hours\` int NOT NULL, \`education_id\` int NOT NULL, \`category_id\` int NOT NULL, \`position\` varchar(255) NOT NULL, \`experiense_id\` int NOT NULL, \`skill_id\` int NOT NULL, \`english\` varchar(255) NOT NULL DEFAULT 'not chosen', \`other\` text NOT NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` int(1) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`profiles\``);
    }

}
