/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSetting15823813000022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_settings" (
        "user_id" uuid,
        "organization_id" uuid,
        "settings" jsonb,
        PRIMARY KEY ("user_id", "organization_id"),
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE INDEX ON "user_settings" ("user_id", "organization_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_settings');
  }
}
