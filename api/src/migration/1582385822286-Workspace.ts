/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Workspace1582385822286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspaces" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR (255) NOT NULL,
        about VARCHAR (255),
        user_id uuid,
        avatar VARCHAR (255)
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "workspaces"
        ADD FOREIGN KEY (user_id) REFERENCES users (id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE IF EXIST "workspaces"');
  }
}
