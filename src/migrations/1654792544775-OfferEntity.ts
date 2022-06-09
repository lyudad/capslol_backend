import {MigrationInterface, QueryRunner} from "typeorm";

export class OfferEntity1654792544775 implements MigrationInterface {
    name = 'OfferEntity1654792544775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('opened', 'closed') NOT NULL DEFAULT 'opened', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`closedAt\` timestamp NULL, \`jobId\` int NULL, \`ownerId\` int NULL, \`freelancerId\` int NULL, \`offerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_85d992a24221873158fa846351d\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_83da1c4b4e98a1254703438aa9c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_e57b156157d41fa38c1c1cd06d0\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_b61e944e4f72458a7cd75e59020\` FOREIGN KEY (\`offerId\`) REFERENCES \`offers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_b61e944e4f72458a7cd75e59020\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_e57b156157d41fa38c1c1cd06d0\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_83da1c4b4e98a1254703438aa9c\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_85d992a24221873158fa846351d\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
    }

}
