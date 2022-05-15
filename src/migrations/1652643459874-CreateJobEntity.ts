import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateJobEntity1652643459874 implements MigrationInterface {
    name = 'CreateJobEntity1652643459874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL DEFAULT '', \`role\` int NULL, \`email\` varchar(50) NOT NULL, \`phoneNumber\` varchar(25) NULL, \`password\` varchar(255) NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isGoogle\` tinyint NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`specialization\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experiences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`profileImage\` varchar(255) NOT NULL, \`hourRate\` int NOT NULL, \`availableHours\` int NOT NULL, \`position\` varchar(255) NOT NULL, \`english\` enum ('No English', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced', 'No set') NOT NULL DEFAULT 'No set', \`other\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`educationsId\` int NULL, \`experienseId\` int NULL, \`categoriesId\` int NULL, UNIQUE INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`timeAvailable\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`languageLevel\` int NOT NULL, \`ownerId\` int NOT NULL, \`categoryId\` int NOT NULL, UNIQUE INDEX \`REL_f56229956adaac39fa9864f5f5\` (\`ownerId\`), UNIQUE INDEX \`REL_73a44bd20f3520849aafd304f6\` (\`categoryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles_skills_skills\` (\`profilesId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_8401800ec9c15b8f383ac8d9c0\` (\`profilesId\`), INDEX \`IDX_36a9448df496235d81a7ceb089\` (\`skillsId\`), PRIMARY KEY (\`profilesId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills_jobs\` (\`jobId\` int NOT NULL, \`skillId\` int NOT NULL, INDEX \`IDX_96e4636d980be9ef275dd0ead2\` (\`jobId\`), INDEX \`IDX_c27e8982f25d29ac33dac8cbc3\` (\`skillId\`), PRIMARY KEY (\`jobId\`, \`skillId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_75247f6c48e0ee95dffc62f7850\` FOREIGN KEY (\`educationsId\`) REFERENCES \`educations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8843f969ae95dd81ae5eae13603\` FOREIGN KEY (\`experienseId\`) REFERENCES \`experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8c8366f05a38420692da93f5fc5\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_f56229956adaac39fa9864f5f59\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_73a44bd20f3520849aafd304f69\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` ADD CONSTRAINT \`FK_8401800ec9c15b8f383ac8d9c0d\` FOREIGN KEY (\`profilesId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` ADD CONSTRAINT \`FK_36a9448df496235d81a7ceb089d\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skills\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` ADD CONSTRAINT \`FK_96e4636d980be9ef275dd0ead26\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` ADD CONSTRAINT \`FK_c27e8982f25d29ac33dac8cbc3d\` FOREIGN KEY (\`skillId\`) REFERENCES \`skills\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` DROP FOREIGN KEY \`FK_c27e8982f25d29ac33dac8cbc3d\``);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` DROP FOREIGN KEY \`FK_96e4636d980be9ef275dd0ead26\``);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` DROP FOREIGN KEY \`FK_36a9448df496235d81a7ceb089d\``);
        await queryRunner.query(`ALTER TABLE \`profiles_skills_skills\` DROP FOREIGN KEY \`FK_8401800ec9c15b8f383ac8d9c0d\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_73a44bd20f3520849aafd304f69\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_f56229956adaac39fa9864f5f59\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8c8366f05a38420692da93f5fc5\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8843f969ae95dd81ae5eae13603\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_75247f6c48e0ee95dffc62f7850\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``);
        await queryRunner.query(`DROP INDEX \`IDX_c27e8982f25d29ac33dac8cbc3\` ON \`skills_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_96e4636d980be9ef275dd0ead2\` ON \`skills_jobs\``);
        await queryRunner.query(`DROP TABLE \`skills_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_36a9448df496235d81a7ceb089\` ON \`profiles_skills_skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_8401800ec9c15b8f383ac8d9c0\` ON \`profiles_skills_skills\``);
        await queryRunner.query(`DROP TABLE \`profiles_skills_skills\``);
        await queryRunner.query(`DROP INDEX \`REL_73a44bd20f3520849aafd304f6\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`REL_f56229956adaac39fa9864f5f5\` ON \`jobs\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
        await queryRunner.query(`DROP INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` ON \`profiles\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
        await queryRunner.query(`DROP TABLE \`experiences\``);
        await queryRunner.query(`DROP TABLE \`educations\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
