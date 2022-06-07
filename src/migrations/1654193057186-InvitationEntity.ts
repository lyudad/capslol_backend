import {MigrationInterface, QueryRunner} from "typeorm";

export class InvitationEntity1654193057186 implements MigrationInterface {
    name = 'InvitationEntity1654193057186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`invitations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` int NULL, \`freelancerId\` int NULL, \`jobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invitations\` ADD CONSTRAINT \`FK_fb023082a27002a896ae4ee559a\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitations\` ADD CONSTRAINT \`FK_7205bba6121dee22a2535890127\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitations\` ADD CONSTRAINT \`FK_49951fcfd1f7d0b5a5c2e4b07b7\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invitations\` DROP FOREIGN KEY \`FK_49951fcfd1f7d0b5a5c2e4b07b7\``);
        await queryRunner.query(`ALTER TABLE \`invitations\` DROP FOREIGN KEY \`FK_7205bba6121dee22a2535890127\``);
        await queryRunner.query(`ALTER TABLE \`invitations\` DROP FOREIGN KEY \`FK_fb023082a27002a896ae4ee559a\``);
        await queryRunner.query(`DROP TABLE \`invitations\``);
    }

}
