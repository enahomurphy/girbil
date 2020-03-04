
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOrganization1582381400005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE role_type AS ENUM('owner', 'admin', 'researcher', 'user');
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_organizations" (
        "user_id" uuid,
        "organization_id" uuid,
        "accepted" boolean DEFAULT false,
        "joined_date" timestamp,
        "role" role_type DEFAULT 'user',
        PRIMARY KEY ("user_id", "organization_id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_organizations');
    await queryRunner.query('DROP TYPE IF EXISTS role_type');
  }
}
