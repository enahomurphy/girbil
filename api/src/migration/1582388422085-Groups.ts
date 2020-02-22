/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Groups1582388422085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "groups" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR (255) NOT NULL,
        about TEXT,
        user_id uuid,
        workspace_id uuid,
        last_update_by uuid,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (last_update_by) REFERENCES users(id),
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE IF EXIST "groups"');
  }
}
