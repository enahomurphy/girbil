
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Channel1582381400006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "channels" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar(255),
        "about" text,
        "is_private" boolean DEFAULT false,
        "user_id" uuid,
        "avatar" varchar,
        "last_updated_by_id" uuid,
        "organization_id" uuid,
        "created_at" timestamp DEFAULT Now(),
        "updated_at" timestamp DEFAULT Now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('channels');
  }
}
