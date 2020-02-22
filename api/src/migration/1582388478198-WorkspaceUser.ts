/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkspaceUser1582388478198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspace_users" (
        user_id uuid,
        team_id uuid,
        FOREIGN KEY (team_id) REFERENCES users(id),
        FOREIGN KEY (team_id) REFERENCES workspaces(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE IF EXIST "workspace_users"');
  }
}
