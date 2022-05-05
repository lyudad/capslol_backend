import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfile1651662397486 implements MigrationInterface {
  name = 'CreateProfile1651662397486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`profiles\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`profile_image\` varchar(255) NOT NULL, \`hour_rate\` int NOT NULL, \`available_hours\` int NOT NULL, \`education_id\` int NOT NULL, \`category_id\` int NOT NULL, \`position\` varchar(255) NOT NULL, \`experiense_id\` int NOT NULL, \`english\` enum ('No English', 'Beginner', 'Intermediate', 'Advanced', 'No set') NOT NULL DEFAULT 'No set', \`other\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` (\`userId\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`experience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company_name\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`start_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`end_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_5e8d5a534100e1b17ee2efa429a\` FOREIGN KEY (\`id\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_5e8d5a534100e1b17ee2efa429a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``,
    );
    await queryRunner.query(`DROP TABLE \`experience\``);
    await queryRunner.query(
      `DROP INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` ON \`profiles\``,
    );
    await queryRunner.query(`DROP TABLE \`profiles\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
