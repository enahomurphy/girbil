
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Teams1582381400002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "teams" (
        "id" uuid PRIMARY KEY,
        "name" varchar NOT NULL,
        "organization_id" uuid,
        "user_id" uuid,
        "about" int,
        "created_at" timestamp
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('teams');
  }
}
