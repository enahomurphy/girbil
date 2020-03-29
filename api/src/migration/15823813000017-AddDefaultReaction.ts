/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultReaction1582381400017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "messages"
      ALTER COLUMN "reactions" DROP DEFAULT,
      ALTER COLUMN "reactions" TYPE jsonb USING to_jsonb(reactions),
      ALTER COLUMN "reactions" SET DEFAULT '[]';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "messages"
      ALTER COLUMN "reactions" DROP DEFAULT;
    `);
  }
}
