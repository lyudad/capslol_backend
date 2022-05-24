import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProposal1653396727395 implements MigrationInterface {
    name = 'CreateProposal1653396727395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`proposals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hourRate\` int NOT NULL, \`coverLetter\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`jobId\` int NOT NULL, \`freelancerId\` int NOT NULL, UNIQUE INDEX \`REL_219edc10f7e4cc15dd19ea5d36\` (\`freelancerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`proposals\` ADD CONSTRAINT \`FK_2c211ba3f45c099feb2a6f72e98\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`proposals\` ADD CONSTRAINT \`FK_219edc10f7e4cc15dd19ea5d36d\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`proposals\` DROP FOREIGN KEY \`FK_219edc10f7e4cc15dd19ea5d36d\``);
        await queryRunner.query(`ALTER TABLE \`proposals\` DROP FOREIGN KEY \`FK_2c211ba3f45c099feb2a6f72e98\``);
        await queryRunner.query(`DROP INDEX \`REL_219edc10f7e4cc15dd19ea5d36\` ON \`proposals\``);
        await queryRunner.query(`DROP TABLE \`proposals\``);
    }

}
