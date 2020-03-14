
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1582381400003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar,
        "email" varchar(255) UNIQUE NOT NULL,
        "password" varchar NULL,
        "is_verified" varchar,
        "avatar" varchar,
        "last_active" timestamp DEFAULT Now()
      );
    `);

    await queryRunner.query(
      `
        CREATE INDEX trgm__users_name_idx ON users USING gin (name gin_trgm_ops);
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
