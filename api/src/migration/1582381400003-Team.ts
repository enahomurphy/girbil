
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Teams1582381400003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "teams" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "about" text,
        "avatar" varchar,
        "user_id" uuid,
        "organization_id" uuid,
        "created_at" timestamp DEFAULT Now(),
        FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id"),
        FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE INDEX ON "teams" ("user_id", "organization_id");        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('teams');
  }
}
