
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShareLink1582381400015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "shares" (
        "id" uuid DEFAULT uuid_generate_v4(),
        "organization_id" uuid NOT NULL,
        "created_at" timestamp DEFAULT Now(),
        PRIMARY KEY ("id", "organization_id"),
        FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('shares');
  }
}
