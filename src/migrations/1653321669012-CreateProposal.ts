import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProposal1653321669012 implements MigrationInterface {
    name = 'CreateProposal1653321669012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`proposals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`freelancerId\` int NOT NULL, \`hourRate\` int NOT NULL, \`coverLetter\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`jobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`proposals\` ADD CONSTRAINT \`FK_2c211ba3f45c099feb2a6f72e98\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`proposals\` DROP FOREIGN KEY \`FK_2c211ba3f45c099feb2a6f72e98\``);
        await queryRunner.query(`DROP TABLE \`proposals\``);
    }

}
