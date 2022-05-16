import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAllTablesConnect1652269229999 implements MigrationInterface {
    name = 'CreateAllTablesConnect1652269229999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`experiences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryТame\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`specialization\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`profileImage\` varchar(255) NOT NULL, \`hourRate\` int NOT NULL, \`availableHours\` int NOT NULL, \`position\` varchar(255) NOT NULL, \`english\` enum ('No English', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced', 'No set') NOT NULL DEFAULT 'No set', \`other\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`educationsId\` int NULL, \`experienseId\` int NULL, \`categoriesId\` int NULL, UNIQUE INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles_skills_skills\` (\`profilesId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_8401800ec9c15b8f383ac8d9c0\` (\`profilesId\`), INDEX \`IDX_36a9448df496235d81a7ceb089\` (\`skillsId\`), PRIMARY KEY (\`profilesId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('Freelancer', 'Job Owner', 'No set') NOT NULL DEFAULT 'No set'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isGoogle\` tinyint NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastName\` \`lastName\` varchar(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_75247f6c48e0ee95dffc62f7850\` FOREIGN KEY (\`educationsId\`) REFERENCES \`educations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8843f969ae95dd81ae5eae13603\` FOREIGN KEY (\`experienseId\`) REFERENCES \`experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8c8366f05a38420692da93f5fc5\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` ADD CONSTRAINT \`FK_8401800ec9c15b8f383ac8d9c0d\` FOREIGN KEY (\`profilesId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` ADD CONSTRAINT \`FK_36a9448df496235d81a7ceb089d\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skills\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` DROP FOREIGN KEY \`FK_36a9448df496235d81a7ceb089d\``);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` DROP FOREIGN KEY \`FK_8401800ec9c15b8f383ac8d9c0d\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8c8366f05a38420692da93f5fc5\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8843f969ae95dd81ae5eae13603\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_75247f6c48e0ee95dffc62f7850\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastName\` \`lastName\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isGoogle\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_36a9448df496235d81a7ceb089\` ON \`profiles_skills_skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_8401800ec9c15b8f383ac8d9c0\` ON \`profiles_skills_skills\``);
        await queryRunner.query(`DROP TABLE \`profiles_skills_skills\``);
        await queryRunner.query(`DROP INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` ON \`profiles\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
        await queryRunner.query(`DROP TABLE \`educations\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`experiences\``);
    }

}