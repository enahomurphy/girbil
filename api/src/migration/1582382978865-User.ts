/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1582382978865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "users" (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR (255) NULL,
          email VARCHAR (255) NOT NULL,
          password VARCHAR (255) NULL,
          isVerified BOOLEAN DEFAULT false NOT NULL,
          avatar VARCHAR (255) NULL,
          UNIQUE(email)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
