/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Channels1582388422085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "channels" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR (255) NOT NULL,
        about TEXT NULL,
        user_id uuid NOT NULL,
        workspace_id uuid NOT NULL,
        avatar VARCHAR(255) NULL,
        last_updated_by_id uuid NOT NULL,
        is_private Boolean DEFAULT false,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (last_updated_by_id) REFERENCES users(id),
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('channels');
  }
}
