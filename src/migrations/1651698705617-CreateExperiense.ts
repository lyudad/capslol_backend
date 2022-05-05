import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateExperiense1651698705617 implements MigrationInterface {
    name = 'CreateExperiense1651698705617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_1ecc32c7c8e5618730f2730613c\``);
        await queryRunner.query(`ALTER TABLE \`experience\` CHANGE \`profileId\` \`profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_1ecc32c7c8e5618730f2730613c\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_1ecc32c7c8e5618730f2730613c\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``);
        await queryRunner.query(`ALTER TABLE \`experience\` CHANGE \`profileId\` \`profileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_1ecc32c7c8e5618730f2730613c\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` int(12) NULL DEFAULT 'NULL'`);
    }

}
