/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkspaceUser1582388478198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspace_users" (
        user_id uuid,
        workspace_id uuid,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('workspace_users');
  }
}
