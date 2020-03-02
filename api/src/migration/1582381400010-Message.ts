
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Message1582381400010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "messages" (
        "id" uuid PRIMARY KEY,
        "sender_id" uuid,
        "conversation_id" uuid,
        "video" varchar,
        "thumbnail" varchar,
        "note" text,
        "read" jsonb,
        "reaction" jsonb[],
        "parent_id" uuid,
        "created_at" timestamp
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('messages');
  }
}
