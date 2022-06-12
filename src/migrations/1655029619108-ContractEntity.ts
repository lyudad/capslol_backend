import {MigrationInterface, QueryRunner} from "typeorm";

export class ContractEntity1655029619108 implements MigrationInterface {
    name = 'ContractEntity1655029619108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('opened', 'closed') NOT NULL DEFAULT 'opened', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`closedAt\` timestamp NULL, \`offerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_b61e944e4f72458a7cd75e59020\` FOREIGN KEY (\`offerId\`) REFERENCES \`offers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_b61e944e4f72458a7cd75e59020\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
    }

}
