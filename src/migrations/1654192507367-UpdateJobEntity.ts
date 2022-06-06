import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateJobEntity1654192507367 implements MigrationInterface {
    name = 'UpdateJobEntity1654192507367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` CHANGE \`projectDuration\` \`projectDuration\` enum ('until 6 months', '6 months', 'over 6 months') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` CHANGE \`projectDuration\` \`projectDuration\` enum ('До 6 месяцев', '6 месяцев', 'Больше 6 месяцев') NULL`);
    }

}
