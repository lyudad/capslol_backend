import {MigrationInterface, QueryRunner} from "typeorm";

export class OfferEntity1654118962706 implements MigrationInterface {
    name = 'OfferEntity1654118962706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`offers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hourRate\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` int NULL, \`freelancerId\` int NULL, \`jobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`offers\` ADD CONSTRAINT \`FK_b3d2e02b02f46a78defedc3650c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offers\` ADD CONSTRAINT \`FK_d7056b542d678261c8769dc54dc\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offers\` ADD CONSTRAINT \`FK_4017be0f2811f53a9ac56a9bf16\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`offers\` DROP FOREIGN KEY \`FK_4017be0f2811f53a9ac56a9bf16\``);
        await queryRunner.query(`ALTER TABLE \`offers\` DROP FOREIGN KEY \`FK_d7056b542d678261c8769dc54dc\``);
        await queryRunner.query(`ALTER TABLE \`offers\` DROP FOREIGN KEY \`FK_b3d2e02b02f46a78defedc3650c\``);
        await queryRunner.query(`DROP TABLE \`offers\``);
    }

}
