import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateJob1653157409386 implements MigrationInterface {
    name = 'CreateJob1653157409386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL DEFAULT '', \`role\` enum ('Freelancer', 'Job Owner', 'No set') NOT NULL DEFAULT 'No set', \`email\` varchar(50) NOT NULL, \`phoneNumber\` varchar(25) NULL, \`password\` varchar(255) NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isGoogle\` tinyint NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`specialization\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`timeAvailable\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`languageLevel\` enum ('No English', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced', 'No set') NOT NULL DEFAULT 'No set', \`ownerId\` int NOT NULL, \`categoryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`profileImage\` varchar(385) NOT NULL, \`hourRate\` int NOT NULL, \`availableHours\` int NOT NULL, \`position\` varchar(255) NOT NULL, \`english\` enum ('No English', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced', 'No set') NOT NULL DEFAULT 'No set', \`other\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`educationsId\` int NULL, \`experienseId\` int NULL, \`categoriesId\` int NULL, UNIQUE INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experiences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyName\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, \`profileId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills_jobs\` (\`jobsId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_0c98d98cf0d76c90689d6e565d\` (\`jobsId\`), INDEX \`IDX_077f60d8e7f06770e4b39645e1\` (\`skillsId\`), PRIMARY KEY (\`jobsId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills_profiles\` (\`profilesId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_5c85effadd3d21e7132abbc222\` (\`profilesId\`), INDEX \`IDX_87f6c82e9f11876e6c4fefec3d\` (\`skillsId\`), PRIMARY KEY (\`profilesId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_f56229956adaac39fa9864f5f59\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_73a44bd20f3520849aafd304f69\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_75247f6c48e0ee95dffc62f7850\` FOREIGN KEY (\`educationsId\`) REFERENCES \`educations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8843f969ae95dd81ae5eae13603\` FOREIGN KEY (\`experienseId\`) REFERENCES \`experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8c8366f05a38420692da93f5fc5\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experiences\` ADD CONSTRAINT \`FK_be01c61f0c549f2187b5c05c349\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` ADD CONSTRAINT \`FK_0c98d98cf0d76c90689d6e565d6\` FOREIGN KEY (\`jobsId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` ADD CONSTRAINT \`FK_077f60d8e7f06770e4b39645e13\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` ADD CONSTRAINT \`FK_5c85effadd3d21e7132abbc2229\` FOREIGN KEY (\`profilesId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` ADD CONSTRAINT \`FK_87f6c82e9f11876e6c4fefec3db\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skills\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` DROP FOREIGN KEY \`FK_87f6c82e9f11876e6c4fefec3db\``);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` DROP FOREIGN KEY \`FK_5c85effadd3d21e7132abbc2229\``);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` DROP FOREIGN KEY \`FK_077f60d8e7f06770e4b39645e13\``);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` DROP FOREIGN KEY \`FK_0c98d98cf0d76c90689d6e565d6\``);
        await queryRunner.query(`ALTER TABLE \`experiences\` DROP FOREIGN KEY \`FK_be01c61f0c549f2187b5c05c349\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8c8366f05a38420692da93f5fc5\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8843f969ae95dd81ae5eae13603\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_75247f6c48e0ee95dffc62f7850\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_73a44bd20f3520849aafd304f69\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_f56229956adaac39fa9864f5f59\``);
        await queryRunner.query(`DROP INDEX \`IDX_87f6c82e9f11876e6c4fefec3d\` ON \`skills_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_5c85effadd3d21e7132abbc222\` ON \`skills_profiles\``);
        await queryRunner.query(`DROP TABLE \`skills_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_077f60d8e7f06770e4b39645e1\` ON \`skills_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_0c98d98cf0d76c90689d6e565d\` ON \`skills_jobs\``);
        await queryRunner.query(`DROP TABLE \`skills_jobs\``);
        await queryRunner.query(`DROP TABLE \`experiences\``);
        await queryRunner.query(`DROP INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` ON \`profiles\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`educations\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
