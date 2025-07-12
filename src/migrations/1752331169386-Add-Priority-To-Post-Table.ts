import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityToPostTable1752331169386 implements MigrationInterface {
    name = 'AddPriorityToPostTable1752331169386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`priority\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`priority\``);
    }

}
