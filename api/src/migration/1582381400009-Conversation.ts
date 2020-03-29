/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Conversation1582381400009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE conversation_type AS ENUM('channel', 'user');
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "conversations" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "creator_id" uuid NOT NULL,
        "receiver_id" uuid NOT NULL,
        "organization_id" uuid NOT NULL,
        "open" boolean default true,
        "receiver_type" conversation_type DEFAULT 'user' NOT NULL,
        "created_at" timestamp DEFAULT Now(),
        FOREIGN KEY ("creator_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id")
      );
    `);

    await queryRunner.query(
      `
        CREATE INDEX ON "conversations" ("creator_id", "receiver_id", "organization_id");
        CREATE INDEX ON "conversations" ("creator_id", "receiver_id", "organization_id", "receiver_type");
        CREATE INDEX ON "conversations" ("creator_id", "receiver_id", "organization_id", "receiver_type", "open");
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('conversations');
  }
}
