import {MigrationInterface, QueryRunner} from "typeorm";

export class NewMigration1655898267545 implements MigrationInterface {
    name = 'NewMigration1655898267545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL DEFAULT '', \`role\` enum ('Freelancer', 'Job Owner', 'No set') NULL, \`email\` varchar(50) NOT NULL, \`phoneNumber\` varchar(25) NULL, \`password\` varchar(255) NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isGoogle\` tinyint NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`specialization\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experiences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyName\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`startAt\` varchar(255) NOT NULL, \`endAt\` varchar(255) NOT NULL, \`profileId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`profileImage\` varchar(385) NULL, \`hourRate\` int NOT NULL, \`availableHours\` int NOT NULL, \`position\` varchar(255) NULL, \`english\` enum ('No English', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced', 'No set') NOT NULL DEFAULT 'No set', \`other\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`categoriesId\` int NULL, UNIQUE INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`timeAvailable\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`languageLevel\` enum ('No English', 'Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced') NULL, \`projectDuration\` enum ('less then 6 months', 'from 6 months to 1 year', 'over 1 year') NULL, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`ownerId\` int NOT NULL, \`categoryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`offers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hourRate\` int NOT NULL, \`status\` enum ('Declined', 'Accepted', 'Pending') NOT NULL DEFAULT 'Pending', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` int NULL, \`freelancerId\` int NULL, \`jobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('opened', 'closed') NOT NULL DEFAULT 'opened', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`closedAt\` timestamp NULL, \`offerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`proposals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hourRate\` int NOT NULL, \`coverLetter\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`jobId\` int NOT NULL, \`freelancerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat-contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NULL DEFAULT 0, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`proposalId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invitations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` int NULL, \`freelancerId\` int NULL, \`jobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(1000) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isOffer\` tinyint NOT NULL DEFAULT 0, \`senderId\` int NOT NULL, \`roomId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educations_profiles\` (\`profilesId\` int NOT NULL, \`educationsId\` int NOT NULL, INDEX \`IDX_7e05552fd1fee37b779b345ee0\` (\`profilesId\`), INDEX \`IDX_ee39d11300a2eab5491701d82f\` (\`educationsId\`), PRIMARY KEY (\`profilesId\`, \`educationsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experiense_profiles\` (\`profilesId\` int NOT NULL, \`experiencesId\` int NOT NULL, INDEX \`IDX_78bc9d13014f1fde9f0ab9289a\` (\`profilesId\`), INDEX \`IDX_51989278c09d0f84f8b64588f4\` (\`experiencesId\`), PRIMARY KEY (\`profilesId\`, \`experiencesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills_profiles\` (\`profilesId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_5c85effadd3d21e7132abbc222\` (\`profilesId\`), INDEX \`IDX_87f6c82e9f11876e6c4fefec3d\` (\`skillsId\`), PRIMARY KEY (\`profilesId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills_jobs\` (\`jobsId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_0c98d98cf0d76c90689d6e565d\` (\`jobsId\`), INDEX \`IDX_077f60d8e7f06770e4b39645e1\` (\`skillsId\`), PRIMARY KEY (\`jobsId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`experiences\` ADD CONSTRAINT \`FK_be01c61f0c549f2187b5c05c349\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8c8366f05a38420692da93f5fc5\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_f56229956adaac39fa9864f5f59\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_73a44bd20f3520849aafd304f69\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offers\` ADD CONSTRAINT \`FK_b3d2e02b02f46a78defedc3650c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offers\` ADD CONSTRAINT \`FK_d7056b542d678261c8769dc54dc\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offers\` ADD CONSTRAINT \`FK_4017be0f2811f53a9ac56a9bf16\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_b61e944e4f72458a7cd75e59020\` FOREIGN KEY (\`offerId\`) REFERENCES \`offers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`proposals\` ADD CONSTRAINT \`FK_2c211ba3f45c099feb2a6f72e98\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`proposals\` ADD CONSTRAINT \`FK_219edc10f7e4cc15dd19ea5d36d\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat-contacts\` ADD CONSTRAINT \`FK_85a9a13329d027ce0c7b77d694d\` FOREIGN KEY (\`proposalId\`) REFERENCES \`proposals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitations\` ADD CONSTRAINT \`FK_fb023082a27002a896ae4ee559a\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitations\` ADD CONSTRAINT \`FK_7205bba6121dee22a2535890127\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitations\` ADD CONSTRAINT \`FK_49951fcfd1f7d0b5a5c2e4b07b7\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_aaa8a6effc7bd20a1172d3a3bc8\` FOREIGN KEY (\`roomId\`) REFERENCES \`chat-contacts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`educations_profiles\` ADD CONSTRAINT \`FK_7e05552fd1fee37b779b345ee08\` FOREIGN KEY (\`profilesId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`educations_profiles\` ADD CONSTRAINT \`FK_ee39d11300a2eab5491701d82f6\` FOREIGN KEY (\`educationsId\`) REFERENCES \`educations\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`experiense_profiles\` ADD CONSTRAINT \`FK_78bc9d13014f1fde9f0ab9289a4\` FOREIGN KEY (\`profilesId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`experiense_profiles\` ADD CONSTRAINT \`FK_51989278c09d0f84f8b64588f4c\` FOREIGN KEY (\`experiencesId\`) REFERENCES \`experiences\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` ADD CONSTRAINT \`FK_5c85effadd3d21e7132abbc2229\` FOREIGN KEY (\`profilesId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` ADD CONSTRAINT \`FK_87f6c82e9f11876e6c4fefec3db\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skills\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` ADD CONSTRAINT \`FK_0c98d98cf0d76c90689d6e565d6\` FOREIGN KEY (\`jobsId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` ADD CONSTRAINT \`FK_077f60d8e7f06770e4b39645e13\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` DROP FOREIGN KEY \`FK_077f60d8e7f06770e4b39645e13\``);
        await queryRunner.query(`ALTER TABLE \`skills_jobs\` DROP FOREIGN KEY \`FK_0c98d98cf0d76c90689d6e565d6\``);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` DROP FOREIGN KEY \`FK_87f6c82e9f11876e6c4fefec3db\``);
        await queryRunner.query(`ALTER TABLE \`skills_profiles\` DROP FOREIGN KEY \`FK_5c85effadd3d21e7132abbc2229\``);
        await queryRunner.query(`ALTER TABLE \`experiense_profiles\` DROP FOREIGN KEY \`FK_51989278c09d0f84f8b64588f4c\``);
        await queryRunner.query(`ALTER TABLE \`experiense_profiles\` DROP FOREIGN KEY \`FK_78bc9d13014f1fde9f0ab9289a4\``);
        await queryRunner.query(`ALTER TABLE \`educations_profiles\` DROP FOREIGN KEY \`FK_ee39d11300a2eab5491701d82f6\``);
        await queryRunner.query(`ALTER TABLE \`educations_profiles\` DROP FOREIGN KEY \`FK_7e05552fd1fee37b779b345ee08\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_aaa8a6effc7bd20a1172d3a3bc8\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
        await queryRunner.query(`ALTER TABLE \`invitations\` DROP FOREIGN KEY \`FK_49951fcfd1f7d0b5a5c2e4b07b7\``);
        await queryRunner.query(`ALTER TABLE \`invitations\` DROP FOREIGN KEY \`FK_7205bba6121dee22a2535890127\``);
        await queryRunner.query(`ALTER TABLE \`invitations\` DROP FOREIGN KEY \`FK_fb023082a27002a896ae4ee559a\``);
        await queryRunner.query(`ALTER TABLE \`chat-contacts\` DROP FOREIGN KEY \`FK_85a9a13329d027ce0c7b77d694d\``);
        await queryRunner.query(`ALTER TABLE \`proposals\` DROP FOREIGN KEY \`FK_219edc10f7e4cc15dd19ea5d36d\``);
        await queryRunner.query(`ALTER TABLE \`proposals\` DROP FOREIGN KEY \`FK_2c211ba3f45c099feb2a6f72e98\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_b61e944e4f72458a7cd75e59020\``);
        await queryRunner.query(`ALTER TABLE \`offers\` DROP FOREIGN KEY \`FK_4017be0f2811f53a9ac56a9bf16\``);
        await queryRunner.query(`ALTER TABLE \`offers\` DROP FOREIGN KEY \`FK_d7056b542d678261c8769dc54dc\``);
        await queryRunner.query(`ALTER TABLE \`offers\` DROP FOREIGN KEY \`FK_b3d2e02b02f46a78defedc3650c\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_73a44bd20f3520849aafd304f69\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_f56229956adaac39fa9864f5f59\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8c8366f05a38420692da93f5fc5\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``);
        await queryRunner.query(`ALTER TABLE \`experiences\` DROP FOREIGN KEY \`FK_be01c61f0c549f2187b5c05c349\``);
        await queryRunner.query(`DROP INDEX \`IDX_077f60d8e7f06770e4b39645e1\` ON \`skills_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_0c98d98cf0d76c90689d6e565d\` ON \`skills_jobs\``);
        await queryRunner.query(`DROP TABLE \`skills_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_87f6c82e9f11876e6c4fefec3d\` ON \`skills_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_5c85effadd3d21e7132abbc222\` ON \`skills_profiles\``);
        await queryRunner.query(`DROP TABLE \`skills_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_51989278c09d0f84f8b64588f4\` ON \`experiense_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_78bc9d13014f1fde9f0ab9289a\` ON \`experiense_profiles\``);
        await queryRunner.query(`DROP TABLE \`experiense_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee39d11300a2eab5491701d82f\` ON \`educations_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_7e05552fd1fee37b779b345ee0\` ON \`educations_profiles\``);
        await queryRunner.query(`DROP TABLE \`educations_profiles\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`invitations\``);
        await queryRunner.query(`DROP TABLE \`chat-contacts\``);
        await queryRunner.query(`DROP TABLE \`proposals\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
        await queryRunner.query(`DROP TABLE \`offers\``);
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
