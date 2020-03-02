
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Channel1582381400006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "channels" (
        "id" uuid PRIMARY KEY,
        "name" varchar(255),
        "about" text,
        "is_private" boolean DEFAULT true,
        "user_id" uuid,
        "avatar" varchar,
        "created_at" timestamp,
        "last_updated_by_id" uuid,
        "organization_id" uuid
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('channels');
  }
}
